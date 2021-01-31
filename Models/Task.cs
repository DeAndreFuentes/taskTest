




namespace calender.Models 

{

public class Task


{

    public int Id {get; set;}


    public string Title { get; set;}

    public bool important { get; set;}

    public string StartDate { get; set;}

    public string DueDate {get; set;}

    public string Description {get; set;}

    public int Status { get; set;}
     
    public string User { get; set; }

    public Task() 
    {

    }

     }



}
