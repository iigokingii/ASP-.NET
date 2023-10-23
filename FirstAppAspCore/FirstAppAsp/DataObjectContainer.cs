namespace FirstAppAsp
{
    public class DataObjectContainer
    {
        int id;
        List<DataObject> objects;
        public DataObjectContainer() {
            objects = new List<DataObject>();
        }
        public DataObjectContainer(int _id) {
            id = _id;
            objects = new List<DataObject>();
        }
        public void CreateObjects() {
            DataObject obj1 = new DataObject("0", "Kirill", "Makrush");
            DataObject obj2 = new DataObject("1", "Eugeney", "Adamovich");
            DataObject obj3 = new DataObject("2", "Aleksey", "Kravchenko");
            objects.Add(obj1); objects.Add(obj2); objects.Add(obj3);
        }
        public List<DataObject> GetDataObjects()
        {
            return objects;
        }
    }
}
