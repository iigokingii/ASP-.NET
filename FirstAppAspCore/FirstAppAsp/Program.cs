using FirstAppAsp;

DataObjectContainer container = new DataObjectContainer(0);
container.CreateObjects();
List<DataObject> objects = container.GetDataObjects();

var builder = WebApplication.CreateBuilder();
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();


app.MapGet("/api/data",()=>objects);

app.MapGet("/api/data/{id}", (string id) =>
{
    DataObject? data = objects.Find(u => u.Id == id);
    if (data ==null)
        return Results.NotFound(new { mess = "Object not found" });
    return Results.Json(data);
});

app.MapDelete("/api/data/{id}", (string id) =>
{
    DataObject? data = objects.Find(u => u.Id == id);
    if (data == null)
        Results.NotFound(new { mess = "Object not found" });
    return Results.Json(data);
        
});

app.MapPost("/api/data", (DataObject obj) =>
{
    obj.Id = (objects.Count + 1).ToString();
    objects.Add(obj);
    return obj;
});

app.MapPut("/api/data", (DataObject obj) =>
{
    DataObject? oldObject = objects.FirstOrDefault(u => u.Id == obj.Id);
    if (oldObject == null)
    {
        return Results.NotFound(new { mess = "Object not found" });
    }
    oldObject.Name = obj.Name;
    oldObject.Surname = obj.Surname;
    return Results.Json(oldObject);
});


app.Run();

