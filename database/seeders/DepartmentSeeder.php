<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faculties = [
            "Arts" => [
                'Literature' => [
                    'Ph.D. in Literature',
                    'Masters in Comparative Literature',
                    'Bachelor of Arts in Literature',
                    'Certificate in Creative Writing',
                ],
                'Languages' => [
                    'Ph.D. in Linguistics',
                    'Masters in Modern Languages',
                    'Bachelor of Arts in Language Studies',
                    'Certificate in Translation and Interpretation',
                ],
                'History' => [
                    'Ph.D. in History',
                    'Masters in Ancient History Studies',
                    'Bachelor of Arts in History',
                    'Certificate in Historical Research',
                ],
                'Philosophy' => [
                    'Ph.D. in Philosophy',
                    'Masters in Ethics and Philosophy',
                    'Bachelor of Arts in Philosophy',
                    'Certificate in Political Philosophy',
                ],
                'Fine Arts' => [
                    'Ph.D. in Fine Arts',
                    'Masters in Visual Arts',
                    'Bachelor of Fine Arts (BFA)',
                    'Certificate in Sculpture and Ceramics',
                ],
                'Performing Arts' => [
                    'Ph.D. in Performing Arts',
                    'Masters in Theater Arts',
                    'Bachelor of Performing Arts (BPA)',
                    'Certificate in Dance (Contemporary)',
                ],
            ],
            "Science" => [
                'Physics' => [
                    'PhD in Physics',
                    'Master of Science in Physics',
                    'Bachelor of Science in Physics',
                    'Certificate in Applied Physics',
                ],
                'Chemistry' => [
                    'PhD in Chemistry',
                    'Master of Science in Chemistry',
                    'Bachelor of Science in Chemistry',
                    'Certificate in Analytical Chemistry',
                ],
                'Biology' => [
                    'PhD in Biology',
                    'Master of Science in Biology',
                    'Bachelor of Science in Biology',
                    'Certificate in Molecular Biology',
                ],
                'Mathematics' => [
                    'PhD in Mathematics',
                    'Master of Science in Mathematics',
                    'Bachelor of Science in Mathematics',
                    'Certificate in Applied Mathematics',
                ],
                'Computer Science' => [
                    'PhD in Computer Science',
                    'Master of Science in Computer Science',
                    'Bachelor of Science in Computer Science',
                    'Certificate in Software Engineering',
                ],
                'Environmental Science' => [
                    'PhD in Environmental Science',
                    'Master of Science in Environmental Science',
                    'Bachelor of Science in Environmental Science',
                    'Certificate in Environmental Management',
                ],
            ],
            "Social Sciences" => [
                'Sociology' => [
                    'PhD in Sociology',
                    'Master of Arts in Sociology',
                    'Bachelor of Science in Sociology',
                    'Certificate in Social Research Methods',
                ],
                'Psychology' => [
                    'PhD in Psychology',
                    'Master of Science in Psychology',
                    'Bachelor of Arts in Psychology',
                    'Certificate in Clinical Psychology',
                ],
                'Economics' => [
                    'PhD in Economics',
                    'Master of Economics',
                    'Bachelor of Business Administration in Economics',
                    'Certificate in Economic Analysis',
                ],
                'Political Science' => [
                    'PhD in Political Science',
                    'Master of Arts in Political Science',
                    'Bachelor of Arts in Political Science',
                    'Certificate in International Relations',
                ],
                'Anthropology' => [
                    'PhD in Anthropology',
                    'Master of Anthropology',
                    'Bachelor of Science in Anthropology',
                    'Certificate in Cultural Anthropology',
                ],
            ],
            "Business" => [
                'Business Administration' => [
                    'PhD in Business Administration',
                    'Masters in Business Administration',
                    'Bachelor of Business Administration',
                    'Certificate in Business Administration',
                ],
                'Accounting' => [
                    'PhD in Accounting',
                    'Masters in Accounting',
                    'Bachelor of Science in Accounting',
                    'Certificate in Accounting',
                ],
                'Finance' => [
                    'PhD in Finance',
                    'Masters in Finance',
                    'Bachelor of Science in Finance',
                    'Certificate in Finance',
                ],
                'Marketing' => [
                    'PhD in Marketing',
                    'Masters in Marketing',
                    'Bachelor of Science in Marketing',
                    'Certificate in Marketing',
                ],
                'Management Information Systems' => [
                    'PhD in Management Information Systems',
                    'Masters in Management Information Systems',
                    'Bachelor of Science in MIS',
                    'Certificate in MIS',
                ],
            ],
            "Law" => [
                'Criminal Law' => [
                    'Ph.D. in Criminal Law',
                    'Masters in Criminal Law',
                    'Degree in Criminal Law',
                    'Certificate in Criminal Law',
                ],
                'Civil Law' => [
                    'Ph.D. in Civil Law',
                    'Masters in Civil Law',
                    'Degree in Civil Law',
                    'Certificate in Civil Law',
                ],
                'International Law' => [
                    'Ph.D. in International Law',
                    'Masters in International Law',
                    'Degree in International Law',
                    'Certificate in International Law',
                ],
                'Constitutional Law' => [
                    'Ph.D. in Constitutional Law',
                    'Masters in Constitutional Law',
                    'Degree in Constitutional Law',
                    'Certificate in Constitutional Law',
                ],
            ],
            "Education" => [
                "Curriculum and Instruction" => [
                    "Ph.D. in Curriculum and Instruction",
                    "Master's in Curriculum Development",
                    "Bachelor's in Education",
                    "Certificate in Teaching Methods",
                ],
                "Educational Leadership" => [
                    "Ph.D. in Educational Leadership",
                    "Master's in Educational Administration",
                    "Bachelor's in Educational Management",
                    "Certificate in School Leadership",
                ],
                "Special Education" => [
                    "Ph.D. in Special Education",
                    "Master's in Inclusive Education",
                    "Bachelor's in Special Needs Education",
                    "Certificate in Learning Disabilities",
                ],
                "Counseling" => [
                    "Ph.D. in Counseling Psychology",
                    "Master's in Clinical Counseling",
                    "Bachelor's in Counseling Studies",
                    "Certificate in Mental Health Counseling",
                ],
            ],
            "Technology" => [
                "Chemical Engineering" => [
                    "PhD in Chemical Engineering",
                    "Masters in Chemical Engineering",
                    "Degree in Chemical Engineering",
                    "Certificate in Chemical Engineering",
                ],
                "Electrical Engineering" => [
                    "PhD in Electrical Engineering",
                    "Masters in Electrical Engineering",
                    "Degree in Electrical Engineering",
                    "Certificate in Electrical Engineering",
                ],
                "Mechanical Engineering" => [
                    "PhD in Mechanical Engineering",
                    "Masters in Mechanical Engineering",
                    "Degree in Mechanical Engineering",
                    "Certificate in Mechanical Engineering",
                ],
                "Civil Engineering" => [
                    "PhD in Civil Engineering",
                    "Masters in Civil Engineering",
                    "Degree in Civil Engineering",
                    "Certificate in Civil Engineering",
                ],
                "Software Engineering" => [
                    "PhD in Software Engineering",
                    "Masters in Software Engineering",
                    "Degree in Software Engineering",
                    "Certificate in Software Engineering",
                ],
            ],
            "Architecture and Design" => [
                'Architecture' => [
                    'Ph.D. in Architecture',
                    'Master of Architecture',
                    'Bachelor of Architecture',
                    'Certificate in Architectural Design',
                ],
                'Urban Planning' => [
                    'Ph.D. in Urban Planning',
                    'Master of Urban Planning',
                    'Bachelor of Urban Planning',
                    'Certificate in Urban Development',
                ],
                'Interior Design' => [
                    'Ph.D. in Interior Design',
                    'Master of Interior Design',
                    'Bachelor of Interior Design',
                    'Certificate in Interior Decoration',
                ],
                'Landscape Architecture' => [
                    'Ph.D. in Landscape Architecture',
                    'Master of Landscape Architecture',
                    'Bachelor of Landscape Architecture',
                    'Certificate in Landscape Design',
                ],
            ],
        ];

        foreach ($faculties as $faculty => $departments) {
            $getFaculty = Faculty::where("name", $faculty)->first();

            // Loop through departments
            foreach ($departments as $department => $courses) {
                Department::factory()->create([
                    "name" => $department,
                    "faculty_id" => $getFaculty->id,
                ]);
            }
        }
    }
}
