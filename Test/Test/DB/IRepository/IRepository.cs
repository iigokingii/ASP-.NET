using Test.Models;

namespace Test.DB.IRepository
{
    public interface IRepository<T>:IDisposable
        where T : class
    {
        void Create(T user);
        void Update(T user);
        void Delete(T user);
        void DeleteById(int id);
        T GetById(int id);
        T GetByInfo(T user);
        IEnumerable<T> GetAll();
        void Save();

    }
}
