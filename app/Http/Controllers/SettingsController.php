<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Setting;
use App\Models\PosSetting;
use App\Models\Client;
use App\Models\User;
use App\Models\Language;
use App\Models\Warehouse;
use App\Models\UserWarehouse;
use App\Models\sms_gateway;
use File;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Config;

class SettingsController extends Controller
{


    //-------------- Update  Settings ---------------\\

    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Setting::class);

        $setting = Setting::findOrFail($id);
        $currentAvatar = $setting->logo;
        if ($request->logo != $currentAvatar) {

            $image = $request->file('logo');
            $path = public_path() . '/images';
            $filename = rand(11111111, 99999999) . $image->getClientOriginalName();

            $image_resize = Image::make($image->getRealPath());
            $image_resize->resize(80, 80);
            $image_resize->save(public_path('/images/' . $filename));

            $userPhoto = $path . '/' . $currentAvatar;
            if (file_exists($userPhoto)) {
                if ($setting->logo != 'logo-default.png') {
                    @unlink($userPhoto);
                }
            }
        } else {
            $filename = $currentAvatar;
        }
        if ($request['currency'] != 'null') {
            $currency = $request['currency'];
        } else {
            $currency = null;
        }

        if ($request['client'] != 'null') {
            $client = $request['client'];
        } else {
            $client = null;
        }

        if ($request['warehouse'] != 'null') {
            $warehouse = $request['warehouse'];
        } else {
            $warehouse = null;
        }

        if ($request['sms_gateway'] != 'null') {
            $sms_gateway = $request['sms_gateway'];
        } else {
            $sms_gateway = null;
        }

        if ($request['default_language'] != 'null') {
            $default_language = $request['default_language'];
        } else {
            $default_language = 'en';
        }

        if($request['is_invoice_footer'] == '1' || $request['is_invoice_footer'] == 'true'){
            $is_invoice_footer = 1;
        }else{
            $is_invoice_footer = 0;
        }

        if($request['quotation_with_stock'] == '1' || $request['quotation_with_stock'] == 'true'){
            $quotation_with_stock = 1;
        }else{
            $quotation_with_stock = 0;
        }

        if($request['show_language'] == '1' || $request['show_language'] == 'true'){
            $show_language = 1;
        }else{
            $show_language = 0;
        }

        Setting::whereId($id)->update([
            'currency_id' => $currency,
            'client_id' => $client,
            'warehouse_id' => $warehouse,
            'email' => $request['email'],
            'default_language' =>  $default_language,
            'CompanyName' => $request['CompanyName'],
            'CompanyPhone' => $request['CompanyPhone'],
            'CompanyAdress' => $request['CompanyAdress'],
            'footer' => $request['footer'],
            'developed_by' => $request['developed_by'],
            'is_invoice_footer' => $is_invoice_footer,
            'quotation_with_stock' => $quotation_with_stock,
            'show_language' => $show_language,
            'invoice_footer' => $request['invoice_footer'],
            'sms_gateway' => $sms_gateway,
            'logo' => $filename,
        ]);

         // Set selected language as default
        $language = Language::where('locale', $default_language)->first();

        // Skip if already default
        if (!$language->is_default) {
            // Set this one as default
            $language->update(['is_default' => true]);

            // Unset others
            Language::where('id', '!=', $language->id)
                ->where('is_default', true)
                ->update(['is_default' => false]);
        }

        $this->setEnvironmentValue([
            'APP_TIMEZONE' => $request['timezone'] !== null?'"' . $request['timezone'] . '"':'"UTC"',
        ]);

        Artisan::call('config:cache');
        Artisan::call('config:clear');

        return response()->json(['success' => true]);
    }


     //-------------- Get Pos Settings ---------------\\

     public function get_pos_Settings(Request $request)
     {
         $this->authorizeForUser($request->user('api'), 'pos_settings', Setting::class);
 
         $PosSetting = PosSetting::where('deleted_at', '=', null)->first();

         return response()->json([
             'pos_settings' => $PosSetting
            ], 200);
    
    }


    //-------------- Update Pos settings ---------------\\

    public function update_pos_settings(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'pos_settings', Setting::class);

        request()->validate([
            'note_customer' => 'required',
        ]);

        if($request['is_printable'] == '1' || $request['is_printable'] == 'true'){
            $is_printable = 1;
        }else{
            $is_printable = 0;
        }

        if($request['show_Warehouse'] == '1' || $request['show_Warehouse'] == 'true'){
            $show_Warehouse = 1;
        }else{
            $show_Warehouse = 0;
        }

        PosSetting::whereId($id)->update([
            'note_customer'  => $request['note_customer'],
            'show_note'      => $request['show_note'],
            'show_barcode'   => $request['show_barcode'],
            'show_discount'  => $request['show_discount'],
            'show_customer'  => $request['show_customer'],
            'show_email'     => $request['show_email'],
            'show_phone'     => $request['show_phone'],
            'show_address'   => $request['show_address'],
            'products_per_page'   => $request['products_per_page'],
            'is_printable'   => $is_printable,
            'show_Warehouse' => $show_Warehouse,
        ]);

        return response()->json(['success' => true]);

    }
    

    //-------------- Get All Settings ---------------\\

    public function getSettings(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Setting::class);

        $settings = Setting::where('deleted_at', '=', null)->first();
        if ($settings) {
            if ($settings->currency_id) {
                if (Currency::where('id', $settings->currency_id)->where('deleted_at', '=', null)->first()) {
                    $item['currency_id'] = $settings->currency_id;
                } else {
                    $item['currency_id'] = '';
                }
            } else {
                $item['currency_id'] = '';
            }

            if ($settings->client_id) {
                if (Client::where('id', $settings->client_id)->where('deleted_at', '=', null)->first()) {
                    $item['client_id'] = $settings->client_id;
                } else {
                    $item['client_id'] = '';
                }
            } else {
                $item['client_id'] = '';
            }

            if ($settings->warehouse_id) {
                if (Warehouse::where('id', $settings->warehouse_id)->where('deleted_at', '=', null)->first()) {
                    $item['warehouse_id'] = $settings->warehouse_id;
                } else {
                    $item['warehouse_id'] = '';
                }
            } else {
                $item['warehouse_id'] = '';
            }

            if ($settings->sms_gateway) {
                if (sms_gateway::where('id', $settings->sms_gateway)->where('deleted_at', '=', null)->first()) {
                    $item['sms_gateway'] = $settings->sms_gateway;
                } else {
                    $item['sms_gateway'] = '';
                }
            } else {
                $item['sms_gateway'] = '';
            }

            $item['id'] = $settings->id;
            $item['email'] = $settings->email;
            $item['CompanyName'] = $settings->CompanyName;
            $item['CompanyPhone'] = $settings->CompanyPhone;
            $item['CompanyAdress'] = $settings->CompanyAdress;
            $item['logo'] = $settings->logo;
            $item['footer'] = $settings->footer;
            $item['developed_by'] = $settings->developed_by;
            $item['default_language'] = $settings->default_language;
            $item['is_invoice_footer'] = $settings->is_invoice_footer;
            $item['invoice_footer'] = $settings->invoice_footer;
            $item['quotation_with_stock'] = $settings->quotation_with_stock;
            $item['show_language'] = $settings->show_language;
            $item['timezone'] = env('APP_TIMEZONE') == null?'UTC':env('APP_TIMEZONE');

            $zones_array = array();
            $timestamp = time();
            foreach(timezone_identifiers_list() as $key => $zone){
                date_default_timezone_set($zone);
                $zones_array[$key]['zone'] = $zone;
                $zones_array[$key]['diff_from_GMT'] = 'UTC/GMT ' . date('P', $timestamp);
                $zones_array[$key]['label'] = $zones_array[$key]['diff_from_GMT'] . ' - ' . $zones_array[$key]['zone'];
            }

            $Currencies = Currency::where('deleted_at', null)->get(['id', 'name']);
            $clients = client::where('deleted_at', '=', null)->get(['id', 'name']);
            $sms_gateway = sms_gateway::where('deleted_at', '=', null)->get(['id', 'title']);

            //get warehouses assigned to user
            $user_auth = auth()->user();
            if($user_auth->is_all_warehouses){
                $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
            }else{
                $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
                $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
            }

            $languages = Language::where('is_active', true)->get(['name', 'locale']);


            return response()->json([
                'settings'    => $item,
                'currencies'  => $Currencies,
                'clients'     => $clients, 
                'warehouses'  => $warehouses,
                'sms_gateway' => $sms_gateway,
                'zones_array' => $zones_array,
                'languages'   => $languages,
            ], 200);
        } else {
            return response()->json(['statut' => 'error'], 500);
        }
    }


    //-------------- Clear_Cache ---------------\\

    public function Clear_Cache(Request $request)
    {
        Artisan::call('cache:clear');
        Artisan::call('view:clear');
        Artisan::call('route:clear');
    }

   
    //-------------- Set Environment Value ---------------\\

    public function setEnvironmentValue(array $values)
    {
        $envFile = app()->environmentFilePath();
        $str = file_get_contents($envFile);
        $str .= "\r\n";
        if (count($values) > 0) {
            foreach ($values as $envKey => $envValue) {
    
                $keyPosition = strpos($str, "$envKey=");
                $endOfLinePosition = strpos($str, "\n", $keyPosition);
                $oldLine = substr($str, $keyPosition, $endOfLinePosition - $keyPosition);
    
                if (is_bool($keyPosition) && $keyPosition === false) {
                    // variable doesnot exist
                    $str .= "$envKey=$envValue";
                    $str .= "\r\n";
                } else {
                    // variable exist                    
                    $str = str_replace($oldLine, "$envKey=$envValue", $str);
                }            
            }
        }
    
        $str = substr($str, 0, -1);
        if (!file_put_contents($envFile, $str)) {
            return false;
        }
    
        app()->loadEnvironmentFrom($envFile);    
    
        return true;
    }


    public function get_appearance_settings(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'appearance_settings', Setting::class);

        $settings = Setting::where('deleted_at', '=', null)->first();
        if ($settings) {
           
            $item['id'] = $settings->id;
          
            $item['favicon'] = $settings->favicon;
            $item['app_name'] = $settings->app_name;
            $item['page_title_suffix'] = $settings->page_title_suffix;
            $item['logo'] = $settings->logo;
            $item['footer'] = $settings->footer;
            $item['developed_by'] = $settings->developed_by;
          
            return response()->json([
                'settings' => $item ,

            ], 200);
        } else {
            return response()->json(['statut' => 'error'], 500);
        }
    }


    public function update_appearance_settings(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'appearance_settings', Setting::class);

        $setting = Setting::findOrFail($id);
        $currentLogo = $setting->logo;
        $currentFavicon = $setting->favicon;

        $logoFilename = $currentLogo;
        $faviconFilename = $currentFavicon;

        // Handle Logo Upload
        if ($request->hasFile('logo') && $request->file('logo') != $currentLogo) {
            $logo = $request->file('logo');
            $logoFilename = rand(11111111, 99999999) . $logo->getClientOriginalName();
            $logoPath = public_path('/images/' . $logoFilename);

            $imageResize = Image::make($logo->getRealPath())->resize(80, 80);
            $imageResize->save($logoPath);

            if ($currentLogo && $currentLogo != 'logo-default.png') {
                $oldLogoPath = public_path('/images/' . $currentLogo);
                if (file_exists($oldLogoPath)) {
                    @unlink($oldLogoPath);
                }
            }
        }

        // Handle Favicon Upload
       if ($request->hasFile('favicon') && $request->file('favicon')->isValid()) {
            $favicon = $request->file('favicon');
            $extension = strtolower($favicon->getClientOriginalExtension());

            if (in_array($extension, ['ico', 'png'])) {
                $faviconFilename = uniqid() . '.' . $extension;
                $favicon->move(public_path('images'), $faviconFilename);

                // Delete old favicon if it exists and is not default
                if ($currentFavicon && $currentFavicon !== 'favicon.ico') {
                    $oldFaviconPath = public_path('images/' . $currentFavicon);
                    if (file_exists($oldFaviconPath)) {
                        @unlink($oldFaviconPath);
                    }
                }
            }
        }


        // Update settings
        $setting->update([
            'footer'             => $request->input('footer'),
            'developed_by'       => $request->input('developed_by'),
            'app_name'           => $request->input('app_name'),
            'page_title_suffix'  => $request->input('page_title_suffix'),
            'logo'               => $logoFilename,
            'favicon'            => $faviconFilename,
        ]);

        return response()->json(['success' => true]);
    }


}
