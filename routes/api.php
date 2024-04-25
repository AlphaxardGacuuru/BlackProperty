<?php

use App\Http\Controllers\AcademicSessionController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BillableController;
use App\Http\Controllers\CardTransactionController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DiscussionForumController;
use App\Http\Controllers\DiscussionForumRatingController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\KopokopoRecipientController;
use App\Http\Controllers\KopokopoTransferController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MPESATransactionController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\UnitController;
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
    "card-transactions" => CardTransactionController::class,
    "mpesa-transactions" => MPESATransactionController::class,
    "kopokopo-recipients" => KopokopoRecipientController::class,
    "kopokopo-transfers" => KopokopoTransferController::class,
    "instructors" => InstructorController::class,
    "students" => StudentController::class,
    "users" => UserController::class,
    "faculties" => FacultyController::class,
    "departments" => DepartmentController::class,
    "courses" => CourseController::class,
    "billables" => BillableController::class,
    "units" => UnitController::class,
    "materials" => MaterialController::class,
    "discussion-forums" => DiscussionForumController::class,
    "discussion-forum-ratings" => DiscussionForumRatingController::class,
    "submissions" => SubmissionController::class,
    "grades" => GradeController::class,
    "sessions" => AcademicSessionController::class,
    "resources" => ResourceController::class,
    "chats" => ChatController::class,
    "staff" => StaffController::class,
    "roles" => RoleController::class,
    'notifications' => NotificationController::class,
]);

/*
 * Admin Dashboard
 */
Route::get("admin", [AdminController::class, "index"]);

// User
Route::get("fee-statements/{id}", [UserController::class, "feeStatements"]);

// Course
Route::get("courses/by-user-id/{id}", [CourseController::class, "byUserId"]);

// Unit
Route::get("units/by-user-id/{id}", [UnitController::class, "byUserId"]);

// Material
Route::get("materials/by-unit-id/{id}", [MaterialController::class, "byUnitId"]);

// Academic Session
Route::get("sessions/by-course-id/{id}", [AcademicSessionController::class, "byCourseId"]);

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
