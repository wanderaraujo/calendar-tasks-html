var app = new Vue({
    el: "#app",
    data: {
        date: new Date(),
        startDateMonth: 1,
        endDateMonth: null,
        daysWeek: [],
        month: null,
        year: null,
        nameAppointment: null,
        modal: false,
        editMode: false,
        dayAppointment: null,
        messageErro:null
    },
    methods: {
        //function open modal to add, edit and delete appointments event
        openModal: function (day) {

            this.modal = true
            this.dayAppointment = day
           
            //check if appoitment exist 
            if (this.$refs.date[day - 1].outerHTML.includes('class="appointment"')) {
                this.nameAppointment = this.$refs.date[day - 1].innerText.substring(2, this.$refs.date[day - 1].innerText.length)
                this.editMode = true
            }

        },
        //function add appointments event
        addAppointment: function () {

            let day = this.dayAppointment
           
            //check if appointment is null or empty
            if(this.nameAppointment == null || this.nameAppointment == ''){
                this.messageErro = "The name cannot be empty"
            }else{
                this.$refs.date[day - 1].innerHTML = this.$refs.date[day - 1].innerHTML + `<p class="appointment">${this.nameAppointment}</p>`
                this.closeModal()
            }

        },
        //function edit appointments event
        editAppointment: function () {

            let day = this.dayAppointment
            
            //check if appointment is null or empty
            if(this.nameAppointment == null || this.nameAppointment == ''){
                this.messageErro = "The name cannot be empty"
            }else{
                this.$refs.date[day - 1].innerHTML = `<p class="day">${day}</p> <p class="appointment">${this.nameAppointment}</p>`
                this.closeModal()
            }

        },
        //function delete appointments event
        deleteAppointment: function () {

            let day = this.dayAppointment
            this.$refs.date[day - 1].innerHTML = `<p class="day">${day}</p>`
            this.closeModal()

        },
        //function close modal clear/reset all fields to new event
        closeModal: function () {

            this.nameAppointment = null
            this.modal = false
            this.editMode = false
            this.messageErro = null
        },

    },
    //intialize params to calendar
    created() {

        this.month = moment().format('MMMM')
        this.year = moment().format('YYYY')
        this.endDateMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
        
        //put first day month in order
        this.daysWeek.push(moment().startOf('month').format('dddd'))

        //iterate days in order of weekend
        let i = 1;
        while (i < 7) {
            this.daysWeek.push(moment().startOf('month').add(i, 'd').format('dddd'))
            i++
        }

    }
})