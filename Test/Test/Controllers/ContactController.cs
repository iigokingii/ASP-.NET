using Microsoft.AspNetCore.Mvc;
using Test.DB.Repository;
using Test.Models;
using Test.Services;

namespace Test.Controllers
{
    public class ContactController : Controller
    {
        ContactService contactService;
        public ContactController()
        {
            contactService = new ContactService();
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        public ContactModel GetContactData(int id)
        {
            return contactService.GetContactData(id);
        }

        [HttpPost]
        public ContactModel AddContact([FromBody] ContactModel user)
        {
            return contactService.AddContact(user);
        }

        [HttpPost]
        public ContactModel UpdateContact([FromBody] ContactModel user)
        {
            return contactService.UpdateContact(user);
        }

        [HttpDelete]
        public void DeleteContact(int id)
        {
            contactService.DeleteContact(id);
        }

        public List<ContactModel> GetData()
        {
            return contactService.GetData();
        }
    }
}
