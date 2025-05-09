<?php

namespace App\Http\Services;

use App\Http\Resources\StatementResource;
use App\Http\Resources\UnitResource;
use App\Http\Services\Service;
use App\Models\CreditNote;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Property;
use App\Models\Unit;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class UnitService extends Service
{
    /*
     * Get All Units
     */
    public function index($request)
    {
        $unitQuery = new Unit;

        $unitQuery = $this->search($unitQuery, $request);

        $units = $unitQuery
            ->orderBy("id", "DESC")
            ->paginate(20)
            ->appends([
                "propertyId" => $request->propertyId,
            ]);

        return UnitResource::collection($units);
    }

    /*
     * Get One Unit
     */
    public function show($id)
    {
        $unit = Unit::findOrFail($id);

        return new UnitResource($unit);
    }

    /*
     * Store Unit
     */
    public function store($request)
    {
        $unit = new Unit;
        $unit->property_id = $request->input("propertyId");
        $unit->name = $request->input("name");
        $unit->rent = $request->input("rent");
        $unit->deposit = $request->input("deposit");
        $unit->type = $request->input("type");
        $unit->bedrooms = $request->input("bedrooms");
        $unit->size = $request->input("size");

        $saved = DB::transaction(function () use ($unit, $request) {
            $saved = $unit->save();

            Property::find($request->propertyId)
                ->increment("unit_count");

            return $saved;
        });

        $message = $unit->name . " created successfully";

        return [$saved, $message, $unit];
    }

    /*
     * Update Unit
     */
    public function update($request, $id)
    {
        $unit = Unit::findOrFail($id);

        if ($request->filled("name")) {
            $unit->name = $request->input("name");
        }

        if ($request->filled("rent")) {
            $unit->rent = $request->input("rent");
        }

        if ($request->filled("deposit")) {
            $unit->deposit = $request->input("deposit");
        }

        if ($request->filled("type")) {
            $unit->type = $request->input("type");
        }

        if ($request->filled("bedrooms")) {
            $unit->bedrooms = $request->input("bedrooms");
            $unit->size = null;
        }

        if ($request->filled("size")) {
            $unit->size = $request->input("size");
            $unit->bedrooms = null;
        }

        $saved = $unit->save();

        $message = $unit->name . " updated successfully";

        return [$saved, $message, $unit];
    }

    /*
     * Destroy
     */
    public function destroy($id)
    {
        $unit = Unit::findOrFail($id);

        $deleted = DB::transaction(function () use ($unit) {
            Property::find($unit->property_id)
                ->decrement("unit_count");

            return $unit->delete();
        });

        $message = $unit->name . " deleted successfully";

        return [$deleted, $message, $unit];
    }

    /*
     * Statements
     */
    public function statements($request, $unitId)
    {
        $type = $request->type;

        $invoiceQuery = Invoice::whereHas("userUnit", function ($query) use ($unitId) {
            $query->where("unit_id", $unitId);
        })->where("type", $type)
            ->select("*", "amount as invoiceDebit");

        $totalInvoices = $invoiceQuery->sum("amount");

        $invoices = $invoiceQuery
            ->orderBy("id", "DESC")
            ->get();

        $paymentQuery = Payment::whereHas("invoice.userUnit", function ($query) use ($unitId) {
            $query->where("unit_id", $unitId);
        })->whereHas("invoice", function ($query) use ($type) {
            $query->where("type", $type);
        })->select("*", "amount as paymentCredit");

        $totalPayments = $paymentQuery->sum("amount");

        $payments = $paymentQuery
            ->orderBy("id", "DESC")
            ->get();

        $creditNoteQuery = CreditNote::whereHas("invoice.userUnit", function ($query) use ($unitId) {
            $query->where("unit_id", $unitId);
        })->whereHas("invoice", function ($query) use ($type) {
            $query->where("type", $type);
        })->select("*", "amount as creditNoteCredit");

        $totalCreditNotes = $creditNoteQuery->sum("amount");

        $creditNotes = $creditNoteQuery
            ->orderBy("id", "DESC")
            ->get();

        $balance = 0;

        $rentStatements = $invoices
            ->concat($payments)
            ->concat($creditNotes)
            ->sortBy("created_at")
            ->values()
            ->map(function ($item) use (&$balance) {
                if ($item->invoiceDebit) {
                    $item->type = "Invoice";
                    $item->debit = $item->invoiceDebit;
                    $balance += $item->invoiceDebit;
                } else if ($item->paymentCredit) {
                    $item->type = "Payment";
                    $item->credit = $item->paymentCredit;
                    $balance -= $item->paymentCredit;
                } else {
                    $item->type = "Credit Note";
                    $item->credit = $item->creditNoteCredit;
                    $balance -= $item->creditNoteCredit;
                }

                $item->balance = $balance;

                return $item;
            })
            ->reverse();

        // Get current page from the request, default is 1
        $currentPage = $request->input("page", 1);

        // Define how many items we want to be visible in each page
        $perPage = 20;

        // Slice the collection to get the items to display in current page
        $currentItems = $rentStatements
            ->slice(($currentPage - 1) * $perPage, $perPage)
            ->values();

        // Create paginator
        $paginator = new LengthAwarePaginator(
            $currentItems,
            $rentStatements->count(),
            $perPage,
            $currentPage,
            [
                'path' => $request->url(),
                'query' => $request->query(),
            ]);

        // return $pagedRentStatements;
        return StatementResource::collection($paginator)
            ->additional([
                "due" => number_format($totalInvoices - $totalCreditNotes),
                "paid" => number_format($totalPayments),
                "balance" => number_format($totalInvoices - $totalCreditNotes - $totalPayments),
            ]);
    }

    /*
     * Search
     */
    public function search($query, $request)
    {
        $propertyId = explode(",", $request->propertyId, );

        if ($request->filled("propertyId")) {
            $query = $query->whereIn("property_id", $propertyId);
        }

        if ($request->filled("name")) {
            $query = $query->where("name", "LIKE", "%" . $request->input("name") . "%");
        }

        if ($request->filled("type")) {
            $query = $query->where("type", $request->type);
        }

        $status = $request->status;

        if ($request->filled("status")) {
            $query = $query->where("status", $request->status);
        }

        return $query;
    }
}
