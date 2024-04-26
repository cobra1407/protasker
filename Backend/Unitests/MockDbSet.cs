using Microsoft.EntityFrameworkCore;
using Moq;

namespace Unitests.Utils
{
    public static class MockDbSet<T> where T : class
    {
        public static Mock<DbSet<T>> CreateDbSetMock(List<T> data)
        {
            var queryableData = data.AsQueryable();
            var mockSet = new Mock<DbSet<T>>();
            mockSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryableData.Provider);
            mockSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryableData.Expression);
            mockSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryableData.ElementType);
            mockSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(queryableData.GetEnumerator());
            return mockSet;
        }
    }
}