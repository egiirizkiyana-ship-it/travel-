<?php

use App\Models\Package;
use App\Models\User;

test('guest cannot access packages admin', function () {
    $response = $this->get(route('admin.packages.index'));
    $response->assertRedirect(route('login'));
});

test('admin can view packages list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->get(route('admin.packages.index'));
    $response->assertOk();
});

test('admin can create package', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->post(route('admin.packages.store'), [
        'name' => 'Paket Umroh Premium',
        'slug' => 'paket-umroh-premium',
        'duration' => '12 Hari',
        'description' => 'Paket umroh premium dengan fasilitas terbaik',
        'price' => 25000000,
        'is_featured' => true,
        'is_active' => true,
        'sort_order' => 0,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('packages', ['name' => 'Paket Umroh Premium']);
});

test('admin can update package', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $package = Package::factory()->create(['name' => 'Old Name']);

    $response = $this->put(route('admin.packages.update', $package), [
        'name' => 'New Name',
        'slug' => $package->slug,
        'duration' => $package->duration,
        'description' => $package->description,
        'price' => $package->price,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('packages', ['id' => $package->id, 'name' => 'New Name']);
});

test('admin can delete package', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $package = Package::factory()->create();

    $response = $this->delete(route('admin.packages.destroy', $package));
    $response->assertRedirect();
    $this->assertDatabaseMissing('packages', ['id' => $package->id]);
});

test('admin cannot create package with invalid data', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $response = $this->post(route('admin.packages.store'), []);
    $response->assertSessionHasErrors(['name', 'slug', 'duration', 'description', 'price']);
});
