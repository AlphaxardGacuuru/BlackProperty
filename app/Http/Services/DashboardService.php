<?php

namespace App\Http\Services;

use App\Http\Resources\UnitResource;
use App\Http\Services\Service;
use App\Models\Invoice;
use App\Models\Property;
use App\Models\Unit;
use App\Models\UserUnit;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardService extends Service
{
    public function index($propertyIds)
    {
        return [
            "tenants" => $this->tenants($propertyIds),
            "units" => $this->units($propertyIds),
            "rent" => $this->rent($propertyIds),
            "water" => $this->water($propertyIds),
            "serviceCharge" => $this->serviceCharge($propertyIds),
        ];
    }

    /*
     * Properties
     */

    public function properties($propertyIds)
    {
        $propertyQuery = Property::whereIn("id", $propertyIds);

        $total = $propertyQuery->count();

        $ids = [];
        $names = [];
        $units = [];

        $properties = $propertyQuery
            ->get()
            ->each(function ($property) use (&$ids, &$names, &$units) {
                $ids[] = $property->id;
                $names[] = $property->name;
                $units[] = $property
                    ->units
                    ->count();
            });

        return [
            "total" => $total,
            "ids" => $ids,
            "names" => $names,
            "units" => $units,
        ];
    }

    /*
     * Units
     */

    public function units($propertyIds)
    {
        $unitsQuery = Unit::whereIn("property_id", $propertyIds);

        $totalOccupied = $unitsQuery
            ->whereHas("userUnits", fn($query) => $query->whereNull("vacated_at"))
            ->count();

        $totalUnoccupied = $unitsQuery
            ->whereHas("userUnits", fn($query) => $query->whereNotNull("vacated_at"))
            ->count();

        $units = Unit::whereIn("property_id", $propertyIds)
            ->orderBy("id", "DESC")
            ->paginate(20);

        $units = UnitResource::collection($units);

        return [
            "totalOccupied" => $totalOccupied,
            "totalUnoccupied" => $totalUnoccupied,
            "list" => $units,
        ];
    }

    /*
     * Tenants
     */

    public function tenants($propertyIds)
    {
        $tenantQuery = UserUnit::whereHas("unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        });

        $total = $tenantQuery->count();

        return [
            "total" => $total,
            "tenantsThisYear" => $this->tenantsThisYear($propertyIds),
            "vacanciesThisYear" => $this->vacanciesThisYear($propertyIds),
        ];
    }

    public function tenantsThisYear($propertyIds)
    {
        $tenantQuery = UserUnit::whereHas("unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        });

        // Get Tenants By Month
        $startOfYear = Carbon::now()->startOfYear();
        $endOfYear = Carbon::now()->endOfYear();

        $getTenantsThisYear = $tenantQuery
            ->select(DB::raw("DATE(occupied_at) as date"), DB::raw("count(*) as count"))
            ->whereBetween("occupied_at", [$startOfYear, $endOfYear])
            ->groupBy(DB::raw("DATE(user_units.occupied_at)"))
            ->get()
            ->map(fn($item) => [
                "month" => Carbon::parse($item->date)->format("F"),
                "count" => $item->count,
            ]);

        // Extract the months from your collection
        $existingMonths = $getTenantsThisYear->pluck("month")->toArray();

        $allMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        // Fill missing months with default count of zero
        $missingMonths = array_diff($allMonths, $existingMonths);
        $missingMonthsData = collect($missingMonths)
            ->map(fn($month) => [
                "month" => $month,
                "count" => 0,
            ])->toArray();

        // Merge existing data with the missing months filled with default count
        $mergedData = $getTenantsThisYear
            ->concat($missingMonthsData)
            ->values();

        $labels = $mergedData->map(fn($item) => $item["month"]);
        $data = $mergedData->map(fn($item) => $item["count"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    public function vacanciesThisYear($propertyIds)
    {
        $tenantQuery = UserUnit::whereHas("unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        });

        // Get Tenants By Month
        $startOfYear = Carbon::now()->startOfYear();
        $endOfYear = Carbon::now()->endOfYear();

        $totalUnits = Unit::whereIn("property_id", $propertyIds)
            ->count();

        $getTenantsThisYear = $tenantQuery
            ->select(DB::raw("DATE(occupied_at) as date"), DB::raw("count(*) as count"))
            ->whereBetween("occupied_at", [$startOfYear, $endOfYear])
            ->groupBy(DB::raw("DATE(user_units.occupied_at)"))
            ->get()
            ->map(fn($item) => [
                "month" => Carbon::parse($item->date)->format("F"),
                "count" => $totalUnits - $item->count,
            ]);

        // Extract the months from your collection
        $existingMonths = $getTenantsThisYear->pluck("month")->toArray();

        $allMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        // Fill missing months with default count of zero
        $missingMonths = array_diff($allMonths, $existingMonths);
        $missingMonthsData = collect($missingMonths)
            ->map(fn($month) => [
                "month" => $month,
                "count" => 0,
            ])->toArray();

        // Merge existing data with the missing months filled with default count
        $mergedData = $getTenantsThisYear
            ->concat($missingMonthsData)
            ->values();

        $labels = $mergedData->map(fn($item) => $item["month"]);
        $data = $mergedData->map(fn($item) => $item["count"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    /*
     * Rent
     */

    public function rent($propertyIds)
    {
        $rentQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        })->where("type", "rent");

        $paidThisMonth = $rentQuery
            ->where("month", Carbon::now()->month)
            ->sum("amount");

        $dueThisMonth = $rentQuery
            ->where("month", Carbon::now()->month)
            ->sum("balance");

        return [
            "total" => number_format($paidThisMonth + $dueThisMonth),
            "paidThisMonth" => $paidThisMonth,
            "dueThisMonth" => $dueThisMonth,
            "paidThisYear" => $this->rentPaidThisYear($propertyIds),
            "unpaidThisYear" => $this->rentDueThisYear($propertyIds),
        ];
    }

    public function rentPaidThisYear($propertyIds)
    {
        $rentQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        })->where("type", "rent");

        $allMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        $getRentThisYear = $rentQuery
            ->select("invoices.month", DB::raw("sum(amount) as rent"))
            ->where("year", Carbon::now()->year)
            ->groupBy("month")
            ->get()
            ->map(fn($item) => [
                "month" => $allMonths[$item->month - 1],
                "rent" => $item->rent,
            ]);

        // Extract the months from your collection
        $existingMonths = $getRentThisYear
            ->pluck("month")
            ->toArray();

        // Fill missing months with default count of zero
        $missingMonths = array_diff($allMonths, $existingMonths);
        $missingMonthsData = collect($missingMonths)
            ->map(fn($month) => [
                "month" => $month,
                "rent" => 0,
            ])->toArray();

        // Merge existing data with the missing months filled with default rent
        $mergedData = $getRentThisYear
            ->concat($missingMonthsData)
            ->values();

        $labels = $mergedData->map(fn($item) => $item["month"]);
        $data = $mergedData->map(fn($item) => $item["rent"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    public function rentDueThisYear($propertyIds)
    {
        $rentQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        })->where("type", "rent");

        $allMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        $getRentThisYear = $rentQuery
            ->select("invoices.month", DB::raw("sum(balance) as rent"))
            ->where("year", Carbon::now()->year)
            ->groupBy("month")
            ->get()
            ->map(fn($item) => [
                "month" => $allMonths[$item->month - 1],
                "rent" => $item->rent,
            ]);

        // Extract the months from your collection
        $existingMonths = $getRentThisYear
            ->pluck("month")
            ->toArray();

        // Fill missing months with default count of zero
        $missingMonths = array_diff($allMonths, $existingMonths);
        $missingMonthsData = collect($missingMonths)
            ->map(fn($month) => [
                "month" => $month,
                "rent" => 0,
            ])->toArray();

        // Merge existing data with the missing months filled with default rent
        $mergedData = $getRentThisYear
            ->concat($missingMonthsData)
            ->values();

        $labels = $mergedData->map(fn($item) => $item["month"]);
        $data = $mergedData->map(fn($item) => $item["rent"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    /*
     * Water
     */

    public function water($propertyIds)
    {
        $waterQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        })->where("type", "water");

        $paidThisMonth = $waterQuery
            ->where("month", Carbon::now()->month)
            ->sum("amount");

        $dueThisMonth = $waterQuery
            ->where("month", Carbon::now()->month)
            ->sum("balance");

        return [
            "total" => number_format($paidThisMonth + $dueThisMonth),
            "paidThisMonth" => $paidThisMonth,
            "dueThisMonth" => $dueThisMonth,
            "paidThisYear" => $this->waterPaidThisYear($propertyIds),
            "unpaidThisYear" => $this->waterDueThisYear($propertyIds),
        ];
    }

    public function waterPaidThisYear($propertyIds)
    {
        $waterQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        })->where("type", "water");

        $allMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        $getRentThisYear = $waterQuery
            ->select("invoices.month", DB::raw("sum(amount) as water"))
            ->where("year", Carbon::now()->year)
            ->groupBy("month")
            ->get()
            ->map(fn($item) => [
                "month" => $allMonths[$item->month - 1],
                "water" => $item->water,
            ]);

        // Extract the months from your collection
        $existingMonths = $getRentThisYear
            ->pluck("month")
            ->toArray();

        // Fill missing months with default count of zero
        $missingMonths = array_diff($allMonths, $existingMonths);
        $missingMonthsData = collect($missingMonths)
            ->map(fn($month) => [
                "month" => $month,
                "water" => 0,
            ])->toArray();

        // Merge existing data with the missing months filled with default water
        $mergedData = $getRentThisYear
            ->concat($missingMonthsData)
            ->values();

        $labels = $mergedData->map(fn($item) => $item["month"]);
        $data = $mergedData->map(fn($item) => $item["water"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    public function waterDueThisYear($propertyIds)
    {
        $waterQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        })->where("type", "water");

        $allMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        $getRentThisYear = $waterQuery
            ->select("invoices.month", DB::raw("sum(balance) as water"))
            ->where("year", Carbon::now()->year)
            ->groupBy("month")
            ->get()
            ->map(fn($item) => [
                "month" => $allMonths[$item->month - 1],
                "water" => $item->water,
            ]);

        // Extract the months from your collection
        $existingMonths = $getRentThisYear
            ->pluck("month")
            ->toArray();

        // Fill missing months with default count of zero
        $missingMonths = array_diff($allMonths, $existingMonths);
        $missingMonthsData = collect($missingMonths)
            ->map(fn($month) => [
                "month" => $month,
                "water" => 0,
            ])->toArray();

        // Merge existing data with the missing months filled with default water
        $mergedData = $getRentThisYear
            ->concat($missingMonthsData)
            ->values();

        $labels = $mergedData->map(fn($item) => $item["month"]);
        $data = $mergedData->map(fn($item) => $item["water"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    /*
     * Service Charge
     */

    public function serviceCharge($propertyIds)
    {
        $serviceChargeQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        })->where("type", "service_charge");

        $paidThisMonth = $serviceChargeQuery
            ->where("month", Carbon::now()->month)
            ->sum("amount");

        $dueThisMonth = $serviceChargeQuery
            ->where("month", Carbon::now()->month)
            ->sum("balance");

        return [
            "total" => number_format($paidThisMonth + $dueThisMonth),
            "paidThisMonth" => $paidThisMonth,
            "dueThisMonth" => $dueThisMonth,
            "paidThisYear" => $this->serviceChargePaidThisYear($propertyIds),
            "unpaidThisYear" => $this->serviceChargeDueThisYear($propertyIds),
        ];
    }

    public function serviceChargePaidThisYear($propertyIds)
    {
        $serviceChargeQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        })->where("type", "serviceCharge");

        $allMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        $getRentThisYear = $serviceChargeQuery
            ->select("invoices.month", DB::raw("sum(amount) as serviceCharge"))
            ->where("year", Carbon::now()->year)
            ->groupBy("month")
            ->get()
            ->map(fn($item) => [
                "month" => $allMonths[$item->month - 1],
                "serviceCharge" => $item->serviceCharge,
            ]);

        // Extract the months from your collection
        $existingMonths = $getRentThisYear
            ->pluck("month")
            ->toArray();

        // Fill missing months with default count of zero
        $missingMonths = array_diff($allMonths, $existingMonths);
        $missingMonthsData = collect($missingMonths)
            ->map(fn($month) => [
                "month" => $month,
                "serviceCharge" => 0,
            ])->toArray();

        // Merge existing data with the missing months filled with default service charge
        $mergedData = $getRentThisYear
            ->concat($missingMonthsData)
            ->values();

        $labels = $mergedData->map(fn($item) => $item["month"]);
        $data = $mergedData->map(fn($item) => $item["serviceCharge"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    public function serviceChargeDueThisYear($propertyIds)
    {
        $serviceChargeQuery = Invoice::whereHas("userUnit.unit.property", function ($query) use ($propertyIds) {
            $query->whereIn("id", $propertyIds);
        })->where("type", "service_charge");

        $allMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        $getRentThisYear = $serviceChargeQuery
            ->select("invoices.month", DB::raw("sum(balance) as serviceCharge"))
            ->where("year", Carbon::now()->year)
            ->groupBy("month")
            ->get()
            ->map(fn($item) => [
                "month" => $allMonths[$item->month - 1],
                "serviceCharge" => $item->serviceCharge,
            ]);

        // Extract the months from your collection
        $existingMonths = $getRentThisYear
            ->pluck("month")
            ->toArray();

        // Fill missing months with default count of zero
        $missingMonths = array_diff($allMonths, $existingMonths);
        $missingMonthsData = collect($missingMonths)
            ->map(fn($month) => [
                "month" => $month,
                "serviceCharge" => 0,
            ])->toArray();

        // Merge existing data with the missing months filled with default service charge
        $mergedData = $getRentThisYear
            ->concat($missingMonthsData)
            ->values();

        $labels = $mergedData->map(fn($item) => $item["month"]);
        $data = $mergedData->map(fn($item) => $item["serviceCharge"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }
}
