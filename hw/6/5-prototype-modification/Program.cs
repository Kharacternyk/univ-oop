﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrototypeFigure
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;

            IFigure figure = new Rectangle(10, 20);
            IFigure clonedFigure = figure.Clone();
            figure.GetInfo();
            clonedFigure.GetInfo();
            figure = new Circle(15);
            clonedFigure = figure.Clone();
            figure.GetInfo();
            clonedFigure.GetInfo();
            figure = new Triangle(3, 4, 0.5);
            clonedFigure = figure.Clone();
            figure.GetInfo();
            clonedFigure.GetInfo();

            Console.Read();
        }
    }

    interface IFigure
    {
        IFigure Clone();
        void GetInfo();
    }
    class Triangle : IFigure
    {
        int side1;
        int side2;
        double angle;
        public Triangle(int side1, int side2, double angle) {
            this.side1 = side1;
            this.side2 = side2;
            this.angle = angle;
        }
        public IFigure Clone()
        {
            return new Triangle(this.side1, this.side2, this.angle);
        }
        public void GetInfo()
        {
            Console.WriteLine("Трикутник зі сторонами {0} та {1} й кутом {2}",
                              side1, side2, angle);
        }
    }
    class Rectangle : IFigure
    {
        int width;
        int height;
        public Rectangle(int w, int h)
        {
            width = w;
            height = h;
        }
        public IFigure Clone()
        {
            return new Rectangle(this.width, this.height);
        }
        public void GetInfo()
        {
            Console.WriteLine("Прямокутник довжиною {0} и шириною {1}", height, width);
        }
    }
    class Circle : IFigure
    {
        int radius;
        public Circle(int r)
        {
            radius = r;
        }
        public IFigure Clone()
        {
            return new Circle(this.radius);
        }
        public void GetInfo()
        {
            Console.WriteLine("Круг радіусом {0}", radius);
        }
    }
}
