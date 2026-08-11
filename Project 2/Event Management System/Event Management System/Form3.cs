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
    public partial class Form3 : Form
    {
        public Form3()
        {
            InitializeComponent();
        }

        DetailDataContext linq = new DetailDataContext();
        private void savebtn_Click(object sender, EventArgs e)
        {
            try
            {
                Regex EnameRegex = new Regex("^[A-Za-z]{6,}$");

                if (!EnameRegex.IsMatch(eventnametxt.Text))
                {
                    MessageBox.Show("Invalid Event Name!\n The name should be atleast 6 letters",
                    "Validation Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                    return;
                }

                if (cmbevent.SelectedIndex == -1)
                {
                    MessageBox.Show("Please select the event name!",
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                    return;
                }

                if (string.IsNullOrWhiteSpace(venuetxt.Text))
                {
                    MessageBox.Show("Venue Required",
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);                    
                    return;
                }

                if (dateTimePicker1.Value.Date < DateTime.Today)
                {
                    MessageBox.Show("Event date cannot be in the past.",
                        "Validation Error",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Warning);
                    //dateTimePicker1.Focus();
                    return;
                }

                Event ev = new Event();
                {
                    ev.EventName = eventnametxt.Text;
                    ev.EventType = cmbevent.Text;
                    ev.EventDate = dateTimePicker1.Value;
                    ev.Venue = venuetxt.Text;
                }

                linq.Events.InsertOnSubmit(ev);
                linq.SubmitChanges();

                MessageBox.Show("Event Created Successfully",
                      "Success",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information);  
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void cancelbtn_Click(object sender, EventArgs e)
        {
            eventnametxt.Text = "";
            cmbevent.Text = "";
            venuetxt.Text = "";
            dateTimePicker1.Value = DateTime.Today;
        }

        private void dashboard_Click(object sender, EventArgs e)
        {
            Form2 f2 =new Form2();
            f2.Show();
            this.Hide();
        }

        private void Form3_Load(object sender, EventArgs e)
        {

        }
    }
}
