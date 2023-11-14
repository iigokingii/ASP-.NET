using Microsoft.AspNetCore.Mvc;
using Test.DB.Repository;
using Test.Models;

namespace Test.Services
{
    public class ContactService
    {
        ContactRepository contactRepository;
        public ContactService()
        {
            contactRepository = new ContactRepository();
        }
        public ContactModel GetContactData(int id)
        {
            return contactRepository.GetById(id);
        }
        public ContactModel AddContact(ContactModel user)
        {
            contactRepository.Create(user);
            contactRepository.Save();
            ContactModel userWithIdGeneratedByDB = contactRepository.GetByInfo(user);
            return userWithIdGeneratedByDB;
        }
        public ContactModel UpdateContact(ContactModel user)
        {
            contactRepository.Update(user);
            contactRepository.Save();
            return user;
        }
        public void DeleteContact(int id)
        {
            contactRepository.DeleteById(id);
            contactRepository.Save();

        }
        public List<ContactModel> GetData()
        {
            return contactRepository.GetAll().ToList();
        }

    }
}
