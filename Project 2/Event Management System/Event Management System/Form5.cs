using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Event_Management_System
{
    public partial class Form5 : Form
    {
        public Form5()
        {
            InitializeComponent();
        }

        DetailDataContext linq = new DetailDataContext();
        private void LoadData()
        {
            try
            {
                dataGridView1.DataSource = linq.Events
                    .Select(e => new
                    {
                        e.EventId,
                        e.EventName,
                        e.EventType,
                        e.EventDate,
                        e.Venue
                    }).ToList();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void refreshbtn_Click(object sender, EventArgs e)
        {
            LoadData();
            MessageBox.Show("Data refreshed successfully!", 
                "Refresh",
               MessageBoxButtons.OK, 
               MessageBoxIcon.Information);
        }

        private void backbtn_Click(object sender, EventArgs e)
        {           
                Form2 f2 = new Form2();
                f2.Show();
                this.Hide();
        }       

        private void Form5_Load(object sender, EventArgs e)
        {

        }
        private void button1_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
