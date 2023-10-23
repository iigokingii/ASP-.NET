namespace FirstAppAsp
{
    public class DataObject
    {
        public DataObject(string _id, string _name, string _surname)
        {
            Id= _id;
            Name = _name;
            Surname = _surname;
        }
        public DataObject() { 
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
