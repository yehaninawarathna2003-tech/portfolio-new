using System;
using System.Linq;
using System.Windows.Forms;

namespace Event_Management_System
{
    public partial class Form6 : Form
    {
        public Form6()
        {
            InitializeComponent();
        }
        DetailDataContext linq = new DetailDataContext(); 
        private void Form6_Load(object sender, EventArgs e)
        {
            LoadGrid();
        }

        private void LoadGrid()
        {
            dataGridView1.DataSource = linq.Events.ToList();
        }
        private void searchbtn_Click(object sender, EventArgs e)
        {
            try
            {               
                int id = int.Parse(txtEventId.Text);
                var ev = linq.Events.SingleOrDefault(x => x.EventId == id);

                if (ev == null)
                {
                    MessageBox.Show("Event is not found",
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                    return;                 
                }

                txtEventName.Text = ev.EventName;
                txtVenue.Text = ev.Venue;
                comboBox1.Text = ev.EventType;
                dateTimePicker1.Value = ev.EventDate;

                txtEventId.ReadOnly = true;
                MessageBox.Show("Event found! You can now update or delete this event.", 
                    "Event Found",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information);
            }
            catch (FormatException)
            {
                MessageBox.Show("Enter valid Event ID");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }      

        private void viewbtn_Click(object sender, EventArgs e)
        {
            Form5 f5 = new Form5();
            f5.Show();
            this.Hide();
        }

        private void updatebtn_Click_1(object sender, EventArgs e)
        {
            try
            {
                int id = int.Parse(txtEventId.Text);
                var ev = linq.Events.FirstOrDefault(x => x.EventId == id);

                if (ev == null)
                {
                    MessageBox.Show("Event is not found",
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                    return;
                }

                DialogResult result = MessageBox.Show(
                    "Are you sure you want to update the event?",
                    "Confirm Update",
                    MessageBoxButtons.YesNo,
                    MessageBoxIcon.Question);

                if(result == DialogResult.Yes)
                {
                    ev.EventName = txtEventName.Text;
                    ev.Venue = txtVenue.Text;
                    ev.EventType = comboBox1.Text;
                    ev.EventDate = dateTimePicker1.Value;

                    linq.SubmitChanges();
                    LoadGrid();

                    MessageBox.Show("Event Updated Successfully",
                          "Success",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Information);
                }               
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void deletebtn_Click_1(object sender, EventArgs e)
        {
            try
            {
                int id = int.Parse(txtEventId.Text);
                var ev = linq.Events.SingleOrDefault(x => x.EventId == id);

                if (ev == null)
                {
                    MessageBox.Show("Event not found",
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                    return;
                }

                DialogResult dr = MessageBox.Show( "Are you sure? \n Confirm Delete",
                    "Warning",
                    MessageBoxButtons.YesNo,
                    MessageBoxIcon.Warning);

                if (dr == DialogResult.Yes)
                {
                    linq.Events.DeleteOnSubmit(ev);
                    linq.SubmitChanges();
                    LoadGrid();

                    MessageBox.Show("Event Deleted Successfully",
                     "Success",
                   MessageBoxButtons.OK,
                   MessageBoxIcon.Information);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void backbtn_Click(object sender, EventArgs e)
        {
            Form2 f2=new Form2();
            f2.Show();
            this.Hide();
        }
    }
}
