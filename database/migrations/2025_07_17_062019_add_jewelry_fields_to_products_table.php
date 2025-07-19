<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddJewelryFieldsToProductsTable extends Migration
{
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedSmallInteger('gold_purity')->nullable()->after('gold_price_per_gram')->comment('Проба золота, например 585');
            $table->decimal('diamond_carat', 8, 3)->nullable()->after('gold_purity')->comment('Карат бриллианта');
            $table->string('stone_color', 50)->nullable()->after('diamond_carat')->comment('Цвет камня');
        });
    }

    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['gold_purity', 'diamond_carat', 'stone_color']);
        });
    }
}