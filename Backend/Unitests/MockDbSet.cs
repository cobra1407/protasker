using Microsoft.EntityFrameworkCore;
using MockQueryable.Moq;
using Moq;

namespace Unitests.Utils
{
    public static class MockDbSet<T> where T : class
    {
        public static Mock<DbSet<T>> CreateDbSetMock(List<T> data)
        {
            return data.AsQueryable().BuildMockDbSet();
        }
    }
}