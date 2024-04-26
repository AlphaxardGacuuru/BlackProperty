<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CardTransactionController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\KopokopoRecipientController;
use App\Http\Controllers\KopokopoTransferController;
use App\Http\Controllers\MPESATransactionController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UserController;
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
    "card-transactions" => CardTransactionController::class,
    "mpesa-transactions" => MPESATransactionController::class,
    "kopokopo-recipients" => KopokopoRecipientController::class,
    "kopokopo-transfers" => KopokopoTransferController::class,
    "instructors" => InstructorController::class,
    "users" => UserController::class,
    "staff" => StaffController::class,
    "roles" => RoleController::class,
    'notifications' => NotificationController::class,
]);

/*
 * Admin Dashboard
 */
Route::get("admin", [AdminController::class, "index"]);

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
