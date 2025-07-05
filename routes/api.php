<?php

use App\Http\Controllers\CardTransactionController;
use App\Http\Controllers\CreditNoteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeductionController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\KopokopoRecipientController;
use App\Http\Controllers\KopokopoTransferController;
use App\Http\Controllers\MPESATransactionController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SMSController;
use App\Http\Controllers\SMSMessageController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StatementController;
use App\Http\Controllers\SubscriptionPlanController;
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

Route::middleware('auth:sanctum')->group(function () {

	Route::get('auth', [UserController::class, 'auth']);

	Route::apiResources([
		"properties" => PropertyController::class,
		"units" => UnitController::class,
		"tenants" => TenantController::class,
		"invoices" => InvoiceController::class,
		"water-readings" => WaterReadingController::class,
		"card-transactions" => CardTransactionController::class,
		"payments" => PaymentController::class,
		"credit-notes" => CreditNoteController::class,
		"deductions" => DeductionController::class,
		"statements" => StatementController::class,
		"kopokopo-recipients" => KopokopoRecipientController::class,
		"kopokopo-transfers" => KopokopoTransferController::class,
		"users" => UserController::class,
		"staff" => StaffController::class,
		"roles" => RoleController::class,
		"notifications" => NotificationController::class,
		"subscription-plans" => SubscriptionPlanController::class,
	]);

	/*
 	* Dashboard
 	*/
	Route::get("dashboard/{id}", [DashboardController::class, "index"]);
	Route::get("dashboard/properties/{id}", [DashboardController::class, "properties"]);

	/*
	* Units
	*/
	Route::get("units/statements/{id}", [UnitController::class, "statements"]);

	/*
 	* Invoices
 	*/
	Route::post("invoices/send-email/{id}", [InvoiceController::class, "sendEmail"]);
	Route::post("invoices/send-sms/{id}", [InvoiceController::class, "sendSMS"]);

	/*
	* Subscription Plans
	*/
	Route::post("subscription-plans/subscribe", [SubscriptionPlanController::class, "subscribe"]);

	// Kopokopo STK Push
	Route::post("stk-push", [MPESATransactionController::class, 'stkPush']);
	Route::post("kopokopo-initiate-transfer", [KopokopoTransferController::class, 'initiateTransfer']);

	// Broadcast Routes
	Broadcast::routes();
});

Route::apiResources([
	"mpesa-transactions" => MPESATransactionController::class,
	"emails" => EmailController::class,
	"smses" => SMSController::class,
]);

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

Route::get('/mailable/{id}', function ($id) {
	$invoice = App\Models\Invoice::find($id);

	return new App\Mail\InvoiceMail($invoice);
});
