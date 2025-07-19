<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // Insert some stuff
        DB::table('settings')->insert(
            array(
                'id' => 1,
                'email' => 'admin@akika.tj',
                'currency_id' => 1,
                'client_id' => 1,
                'sms_gateway' => 1,
                'is_invoice_footer' => 0,
                'invoice_footer' => Null,
                'warehouse_id' => Null,
                'CompanyName' => 'Akika system',
                'CompanyPhone' => '44610-40-10',
                'CompanyAdress' => 'Хиёбонӣ Рӯдаки 37}',
                'footer' => 'Akika | Accounting system',
                'developed_by' => 'Komron.r',
                'logo' => 'logo-default.png',
                'app_name' => 'Akika | Accounting system',
                'page_title_suffix' => 'Akika | Accounting system',
                'favicon' => 'favicon.ico',
            )
            
        );
    }
}
