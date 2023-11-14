using Microsoft.EntityFrameworkCore;
using Test.DB.IRepository;
using Test.Models;
using Test.Repositories;

namespace Test.DB.Repository
{
    public class ContactRepository : IRepository<ContactModel>
    {
        private ApplicationContext db;
        public ContactRepository()
        {
            db = new ApplicationContext();
        }
        public void Create(ContactModel user)
        {
            db.Users.Add(user);
        }
        public ContactModel GetById(int id)
        {
            return db.Users.Where(u => u.Id == id).SingleOrDefault();
        }
        public ContactModel GetByInfo(ContactModel _contact)
        {
            return db.Users.Where(contact => contact.Name == _contact.Name && contact.JobTitle == _contact.JobTitle && contact.MobilePhone == _contact.MobilePhone && contact.BirthDate == _contact.BirthDate).SingleOrDefault();
        }
        public void DeleteById(int id)
        {
            ContactModel delUser= db.Users.Where(contact=> contact.Id==id).SingleOrDefault();
            db.Users.Remove(delUser);
        }
        public void Delete(ContactModel user)
        {
            db.Users.Remove(user);
        }
        public IEnumerable<ContactModel> GetAll()
        {
            return db.Users;
        }

        public void Save()
        {
            db.SaveChanges();
        }
        public void Update(ContactModel user)
        {
            ContactModel tempUser= db.Users.Find(user.Id);
            if (tempUser != null)
            {
                tempUser.Id = user.Id;
                tempUser.Name = user.Name;
                tempUser.JobTitle=user.JobTitle;
                tempUser.BirthDate = user.BirthDate;
                tempUser.MobilePhone = user.MobilePhone;
            }
        }

        private bool disponsed = false;
        public virtual void Disponse(bool disposing)
        {
            if (!this.disponsed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disponsed = true;
        }
        public void Dispose()
        {
            Disponse(true);
            GC.SuppressFinalize(this);
        }
    }
}
