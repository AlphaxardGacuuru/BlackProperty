<?php

namespace App\Http\Services;

use App\Http\Resources\TenantResource;
use App\Http\Services\Service;
use App\Models\CardTransaction;
use App\Models\MPESATransaction;
use App\Models\Property;
use App\Models\Unit;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardService extends Service
{
    public function index()
    {
        return [
            "properties" => $this->properties(),
            "tenants" => $this->tenants(),
            "units" => $this->units(),
            "staff" => $this->staff(),
            "fees" => $this->fees(),
        ];
    }

    /*
     * Get Tenants Data
     */
    public function tenants()
    {
        $tenantQuery = User::where("account_type", "tenant");

        $total = $tenantQuery->count();

        $carbonYesterday = now()->subDay();

        $yesterday = $tenantQuery->whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = $tenantQuery->whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getTenantsLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "tenant")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        $tenants = $tenantQuery->orderBy("id", "DESC")->paginate(20);

        $tenants = tenantResource::collection($tenants);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getTenantsLastWeek,
            "list" => $tenants,
            "lastMonth" => $this->tenantsLastMonth(),
        ];
    }

    /*
     * Get Staff Data
     */
    public function staff()
    {
        $staffQuery = User::where("account_type", "staff");

        $total = $staffQuery->count();

        $carbonYesterday = now()->subDay();

        $yesterday = $staffQuery->whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = $staffQuery->whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getUsersLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "student")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        $staff = $staffQuery->orderBy("id", "DESC")->paginate(20);

        $staff = tenantResource::collection($staff);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getUsersLastWeek,
            "list" => $staff,
            "lastMonth" => $this->staffLastMonth(),
        ];
    }

    /*
     * Get Tenants Data
     */
    public function properties()
    {
        $total = Property::count();

        $carbonYesterday = now()->subDay();

        $yesterday = Property::whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = Property::whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getPropertiesLastWeek = Property::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(properties.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getPropertiesLastWeek,
        ];
    }

    /*
     * Get Tenants Data
     */
    public function units()
    {
        $total = Unit::count();

        $carbonYesterday = now()->subDay();

        $yesterday = Unit::whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = Unit::whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getUnitsLastWeek = Unit::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(units.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getUnitsLastWeek,
        ];
    }

    /*
     * Get Fees Data
     */
    public function fees()
    {
        $total = CardTransaction::sum("amount") + MPESATransaction::sum("amount");

        $carbonYesterday = now()->subDay();

        $yesterday1 = CardTransaction::whereDate("created_at", $carbonYesterday)->sum("amount");
        $yesterday2 = MPESATransaction::whereDate("created_at", $carbonYesterday)->sum("amount");

        $carbonToday = Carbon::today()->toDateString();

        $today1 = CardTransaction::whereDate("created_at", $carbonToday)->sum("amount");
        $today2 = MPESATransaction::whereDate("created_at", $carbonToday)->sum("amount");

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getCardsLastWeek = CardTransaction::select(DB::raw('DATE(created_at) as date'), DB::raw('sum(amount) as sum'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(card_transactions.created_at)'))
            ->get()
            ->map(fn($item) => $item->sum);

        $getMpesaLastWeek = MpesaTransaction::select(DB::raw('DATE(created_at) as date'), DB::raw('sum(amount) as sum'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(mpesa_transactions.created_at)'))
            ->get()
            ->map(fn($item) => $item->sum);

        return [
            "total" => number_format($total),
            "growth" => $this->growth(($yesterday1 + $yesterday2), ($today1 + $today2)),
            "cardsLastWeek" => $getCardsLastWeek,
            "mpesaLastWeek" => $getMpesaLastWeek,
        ];
    }

    /*
     * Get Tenants Last Month
     */
    public function tenantsLastMonth()
    {
        // Get Ordes By Day
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $getTenantsLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "tenant")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->day,
                    "count" => $item->count,
                ];
            });

        // Extract the days from your collection
        $existingDays = $getTenantsLastWeek->pluck('day')->toArray();

        // Get the range of days in the current month (from 1 to the last day of the month)
        $startDay = 1;
        $endDay = now()->endOfMonth()->day;
        $allDays = range($startDay, $endDay);

        // Fill missing days with default count of zero
        $missingDays = array_diff($allDays, $existingDays);
        $missingDaysData = collect($missingDays)->map(function ($day) {
            return [
                "day" => $day,
                "count" => 0,
            ];
        })->toArray();

        // Merge existing data with the missing days filled with default count
        $mergedData = $getTenantsLastWeek
            ->concat($missingDaysData)
            ->sortBy('day')
            ->values();

        $labels = $mergedData->map(fn($item) => $item["day"]);
        $data = $mergedData->map(fn($item) => $item["count"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    /*
     * Get Staff Last Month
     */
    public function staffLastMonth()
    {
        // Get Ordes By Day
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $getStaffLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "staff")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->day,
                    "count" => $item->count,
                ];
            });

        // Extract the days from your collection
        $existingDays = $getStaffLastWeek->pluck('day')->toArray();

        // Get the range of days in the current month (from 1 to the last day of the month)
        $startDay = 1;
        $endDay = now()->endOfMonth()->day;
        $allDays = range($startDay, $endDay);

        // Fill missing days with default count of zero
        $missingDays = array_diff($allDays, $existingDays);
        $missingDaysData = collect($missingDays)->map(function ($day) {
            return [
                "day" => $day,
                "count" => 0,
            ];
        })->toArray();

        // Merge existing data with the missing days filled with default count
        $mergedData = $getStaffLastWeek
            ->concat($missingDaysData)
            ->sortBy('day')
            ->values();

        $labels = $mergedData->map(fn($item) => $item["day"]);
        $data = $mergedData->map(fn($item) => $item["count"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    /*
     * Get Fees Last Week
     */
    public function feesLastWeek()
    {

        // Get Fees By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getFeesLastWeek = Order::select(DB::raw('DATE(created_at) as date'), DB::raw('sum(total_value) as sum'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(orders.created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->dayName,
                    "sum" => $item->sum,
                ];
            });

        $feesLastWeekLabels = $getFeesLastWeek->map(fn($item) => $item["day"]);
        $feesLastWeekData = $getFeesLastWeek->map(fn($item) => $item["sum"]);

        return [
            "labels" => $feesLastWeekLabels,
            "data" => $feesLastWeekData,
        ];
    }

    // Calculate Growth
    public function growth($yesterday, $today)
    {
        // Resolve for Division by Zero
        if ($yesterday == 0) {
            $growth = $today == 0 ? 0 : $today * 100;
        } else if ($today == 0) {
            $growth = $yesterday == 0 ? 0 : $yesterday * -100;
        } else {
            $growth = $today / $yesterday * 100;
        }

        return number_format($growth, 1);
    }
}
