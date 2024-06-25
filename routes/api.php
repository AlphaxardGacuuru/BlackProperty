<?php

use App\Http\Controllers\CardTransactionController;
use App\Http\Controllers\CreditNoteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\KopokopoRecipientController;
use App\Http\Controllers\KopokopoTransferController;
use App\Http\Controllers\MPESATransactionController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WaterReadingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('auth', [UserController::class, 'auth']);

Route::apiResources([
    "properties" => PropertyController::class,
    "units" => UnitController::class,
    "tenants" => TenantController::class,
    "invoices" => InvoiceController::class,
    "water-readings" => WaterReadingController::class,
    "card-transactions" => CardTransactionController::class,
    "mpesa-transactions" => MPESATransactionController::class,
    "payments" => PaymentController::class,
    "credit-notes" => CreditNoteController::class,
    "kopokopo-recipients" => KopokopoRecipientController::class,
    "kopokopo-transfers" => KopokopoTransferController::class,
    "users" => UserController::class,
    "staff" => StaffController::class,
    "roles" => RoleController::class,
    'notifications' => NotificationController::class,
]);

/*
 * Dashboard
 */
Route::get("dashboard/{id}", [DashboardController::class, "index"]);
Route::get("dashboard/properties/{id}", [DashboardController::class, "properties"]);

/*
 * Properties
 */
Route::get("properties/by-user-id/{id}", [PropertyController::class, "byUserId"]);

/*
 * Units
 */
Route::get("units/by-property-id/{id}", [UnitController::class, "byPropertyId"]);
Route::get("units/statements/{id}", [UnitController::class, "statements"]);

/*
 * Tenants
 */
Route::get("tenants/by-property-id/{id}", [TenantController::class, "byPropertyId"]);
Route::get("tenants/by-unit-id/{id}", [TenantController::class, "byUnitId"]);

/*
 * Staff
 */
Route::get("staff/by-property-id/{id}", [StaffController::class, "byPropertyId"]);

/*
 * Invoices
 */
Route::get("invoices/by-property-id/{id}", [InvoiceController::class, "byPropertyId"]);

/*
 * WaterReadings
 */
Route::get("water-readings/by-property-id/{id}", [WaterReadingController::class, "byPropertyId"]);

/*
 * Payments
 */
Route::get("payments/by-property-id/{id}", [PaymentController::class, "byPropertyId"]);

/*
 * CreditNotes
 */
Route::get("credit-notes/by-property-id/{id}", [CreditNoteController::class, "byPropertyId"]);

// Kopokopo STK Push
Route::post("stk-push", [MPESATransactionController::class, 'stkPush']);
Route::post("kopokopo-initiate-transfer", [KopokopoTransferController::class, 'initiateTransfer']);

/*
 * Filepond Controller
 */
Route::prefix('filepond')->group(function () {
    Route::controller(FilePondController::class)->group(function () {
        // User
        Route::post('avatar/{id}', 'updateAvatar');

        // Material
        Route::post("materials", "storeMaterial");
        Route::delete("materials/{id}", "destoryMaterial");

        // Attachment
        Route::post("discussion-forums", "storeAttachment");
        Route::delete("discussion-forums/{id}", "destoryAttachment");

        // Submission
        Route::post("submissions/{sessionId}/{unitId}/{week}/{userId}/{type}", "storeSubmission");
    });
});

// Broadcast Routes
Broadcast::routes(['middleware' => ['auth:sanctum']]);
