using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Text.RegularExpressions;

namespace Event_Management_System
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        DetailDataContext linq = new DetailDataContext();

        
        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                string uname = unametxt.Text;
                string password = passwordtxt.Text;

                //validate inputs
                if (uname == "Thilini" && password == "Thilini@123")
                {
                    Form2 f2 = new Form2();
                    f2.Show();
                    this.Hide();
                }
                else {
                    MessageBox.Show("Invalid Username and Password!",
                        "Validation Error",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Error);
                    return;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void refreshbtn_Click(object sender, EventArgs e)
        {
            unametxt.Text = "";
            passwordtxt.Text = "";
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }      
    }
}
