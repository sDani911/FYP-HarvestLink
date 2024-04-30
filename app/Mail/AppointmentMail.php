<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppointmentMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $cnic;
    public $phoneNo;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public function __construct($name,$email, $cnic, $phoneNo)
    {
        $this->name = $name;
        $this->email = $email;
        $this->cnic = $cnic;
        $this->phoneNo = $phoneNo;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('New Appointment')->view('Mail.appointment');
    }
}
