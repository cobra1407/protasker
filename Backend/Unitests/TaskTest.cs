using BU.Services;
using DAL.Context;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using Unitests.Utils;
using Xunit;
using Xunit.Abstractions;

namespace Unitests;

public class TaskTest
{
    private readonly ITestOutputHelper _output;

    public TaskTest(ITestOutputHelper output)
    {
        _output = output;
    }

    
    [Fact]
    public async void GetTask_should_return_tasks ()
    {
        //arrange
        var tasks = new List<Tache>()
        {
            new Tache(){Libelle = "task1", Statut = 0, DateDerniereModification = null},
            new Tache(){Libelle = "Task2", Statut = 1, DateDerniereModification = null}
        };
      
        var apTicketOptions = new DbContextOptionsBuilder<ProtaskerContext>()
            .UseInMemoryDatabase("testProTasker")
            .Options;

        var mockProtaskerContext = new Mock<ProtaskerContext>();
        var tasksDbSetMock = MockDbSet<Tache>.CreateDbSetMock(tasks);
       
      
        // Configuration mockProtasker
        mockProtaskerContext.Setup(x => x.Taches).Returns(tasksDbSetMock.Object);
      
        //act
        TaskService taskService = new TaskService(mockProtaskerContext.Object);
        var result = await taskService.GetTasks();

        //assert
        Assert.NotNull(result);
        Assert.NotEmpty(result);
        Assert.True(result.Count == 2);
      
    }
}