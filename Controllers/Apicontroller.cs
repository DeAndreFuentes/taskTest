using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using taskManager.Models;


namespace taskManager.Controllers
{

    public class Apicontroller : Controller
    {
        [HttpGet]
        public IActionResult Test()
        {
            var list = new List<string>();
            return Json(list);
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            return null;
        }


        [HttpPost]

        public IActionResult SaveTask([FromBody] Task theTask)


        {
            System.Console.WriteLine("savings an object: " + theTask.Title);
            theTask.Id = 1;

            return Json(theTask);


        }

    }

}