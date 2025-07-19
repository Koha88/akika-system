<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('weight', 8, 2)->nullable();                // вес в граммах
            $table->decimal('gold_price_per_gram', 10, 2)->nullable(); // цена золота за грамм
            $table->decimal('cost_price', 10, 2)->nullable();          // себестоимость
            $table->decimal('margin_percent', 5, 2)->nullable();       // наценка в процентах
            $table->decimal('final_price', 10, 2)->nullable();         // итоговая цена
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'weight',
                'gold_price_per_gram',
                'cost_price',
                'margin_percent',
                'final_price',
            ]);
        });
    }
};
