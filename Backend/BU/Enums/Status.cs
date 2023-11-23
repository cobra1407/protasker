using System.ComponentModel;

namespace ProTasker.Enums;

public enum Status
{
    [Description("En Cours")]
    inProgress = 0,
    
    [Description("Blocked")]
    blocked = 1,
    
    [Description("Terminée")]
    Done = 2,
    
}