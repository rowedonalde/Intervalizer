/**
 * intervalizer.js
 *
 * script for running the Intervalizer webapp
 */

 
$(document).ready(function()
{
  var notes = [null, "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  
  /**
   * This function displays in the document the notes between which the
   * interval is to be determined in the decided direction. This function
   * returns the correct answer.
   */
  var poseQuestion = function()
  {
    var firstNote;
	var secondNote;
	var isAscending = true;
	
	//Randomly determine the first note, the second note, and the direction:
	firstNote = Math.floor(Math.random() * (12 - 1 + 1) + 1);
	secondNote = Math.floor(Math.random() * (12 - 1 + 1) + 1);
	if (Math.random() < 0.5)
	{
	  isAscending = false;
	}
	
	//Change the display on the page:
	$("#firstnote").html(notes[firstNote]);
	$("#secondnote").html(notes[secondNote]);
	if (isAscending)
	{
	  $("#upordown").html("Up to");
	}
	else
	{
	  $("#upordown").html("Down to");
	}
	
	//Figure out the right answer (i.e., the number of half-steps between the
	//notes) starting by checking edge cases and then diverting to the general
	//case. Then, return the correct answer:
	if (isAscending)
	{
	  if (firstNote >= secondNote)
	  {
	    secondNote += 12;
	  }
	  
	  //Rounding is necessary in case of float rounding errors, since we're
	  //comparing directly against an int:
	  return Math.round(secondNote - firstNote);
	}
	else if (!isAscending)
	{
	  if (firstNote <= secondNote)
	  {
	    firstNote += 12;
	  }
	  
	  return Math.round(firstNote - secondNote);
	}
  };
  
  //Initial question:
  var correctAnswer = poseQuestion();
  
  //Verify whether the user has selected the correct answer upon clicking
  //Submit. If so, respond that the user was correct and pose a new question.
  //If not, respond that the user was incorrect, but don't change anything.
  $("#submit").click(function()
  {
    var attempt = $('input:radio[name=answer]:checked').val();
	
	//Only double equals, not triple equals, since we're comparing a
	//string to a number:
	if (attempt == correctAnswer) 
	{
	  correctAnswer = poseQuestion();
	  $("#response").html('<span class="correct">Correct!</span>');
	}
	else
	{
	  $("#response").html('<span class="incorrect">Incorrect :-(</span>');
	}
  });
});