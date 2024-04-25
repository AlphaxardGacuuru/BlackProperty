<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Material>
 */
class MaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
		$richText = "<h1>Learning Guide: KASNEB 1012 Paper No.2 Introduction to Computing Systems</h1><h2>Introduction to the Course</h2><p>This Course unit covers the competencies required to demonstrate foundational concepts of computers, operate computer hardware, identify computer software, perform data representation, identify computer networks, use the Internet and apply computer security.</p><h3>KASNEB Syllabus Topics</h3><p>Summary of Learning Outcomes</p><ol><li>Wk 1-Demonstrate foundational concepts of computers</li><li>Wk 2-Operate computer hardware</li><li>Wk 3-Identify Computer Software-Part 1</li><li>Wk 4- Identify Computer Software-Part 2</li><li>Wk 5-Perform Data representation</li><li>Wk 6-Identify computer networks</li><li>Wk 7-Use the Internet</li><li>Wk 8-Apply Computer Security.</li></ol>";
		
        return [
            "description" => fake()->realText($maxNbChars = 20, $indexSize = 2),
			"rich_text" => $richText
        ];
    }
}
