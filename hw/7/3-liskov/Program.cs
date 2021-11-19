using System;

interface IShape {
    public int GetArea();
}


class Rectangle: IShape
{
    public int Width { get; set; }
    public int Height { get; set; }
    public int GetArea()
    {
        return Width * Height;
    }
}

class Square : IShape
{
    public int Side { get; set; }
    public int GetArea()
    {
        return Side * Side;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Rectangle rect = new Rectangle();
        rect.Width = 5;
        rect.Height = 10;

        Console.WriteLine(rect.GetArea());
        Console.ReadKey();
    }
}
