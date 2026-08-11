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
    public partial class Form4 : Form
    {
        public Form4()
        {
            InitializeComponent();
        }

        private void ClearInputs()
        {
            stnametxt.Text = "";
            cmbfaculty.SelectedIndex = -1;
            contactnumbertxt.Text = "";
        }

        DetailDataContext linq = new DetailDataContext();

        private void registerbtn_Click(object sender, EventArgs e)
        {
            try
            {
                Regex NameRegex = new Regex("^[A-Z][A-Za-z]*$");
                Regex PhonenumberRegex = new Regex("^0\\d{9}$");

                if(!NameRegex.IsMatch(stnametxt.Text))
                {
                    MessageBox.Show("Invalid Student Name\n First letter must be capital.",
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                    return;                  
                }

                if (cmbfaculty.SelectedIndex == -1)
                {
                    MessageBox.Show("Select Faculty",
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                    return;
                }

                if (!PhonenumberRegex.IsMatch(contactnumbertxt.Text))
                {
                    MessageBox.Show("Invalid Contact Number \n Should be 10 digits",
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                    return;
                }

                Student st = new Student();
                {
                    st.Name = stnametxt.Text;
                    st.Faculty = cmbfaculty.Text;
                    st.Contact_Number = contactnumbertxt.Text;
                }

                linq.Students.InsertOnSubmit(st);
                linq.SubmitChanges();

                MessageBox.Show("Student Registered Successfully",
                      "Success",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information);
               
                ClearInputs();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void Form4_Load(object sender, EventArgs e)
        {

        }      
        private void backbtn_Click(object sender, EventArgs e)
        {
            Form2 f2 = new Form2();
            f2.Show();
            this.Hide();
        }
    }
}
