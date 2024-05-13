<?php

namespace App\Services;

use App\Entity\Product;
use App\Model\ShoppingCart;
use Stripe\Checkout\Session;
use Stripe\StripeClient;

class StripeService
{
    private StripeClient $stripeClient;

    public function getStripe(): StripeClient
    {
        return $this->stripeClient ??= new StripeClient($_ENV["STRIPE_API_SECRET"]);
    }

    public function createProduct(Product $product): \Stripe\Product
    {
        return $this->getStripe()->products->create([
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'active' => $product->isActive(),
        ]);
    }

    public function updateProduct(Product $product): \Stripe\Product
    {
        return $this->getStripe()->products->update($product->getStripeProductId(), [
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'active' => $product->isActive(),
        ]);
    }

    public function createPrice(Product $product): \Stripe\Price
    {
        return $this->getStripe()->prices->create([
            'unit_amount' => $product->getPrice(),
            'currency' => 'EUR',
            'product' => $product->getStripeProductId(),
        ]);
    }

    public function createCheckoutSession(ShoppingCart $shoppingCart): \Stripe\Checkout\Session
    {
        $lineItems = [];
        foreach($shoppingCart->items as $item) {
            $lineItems[] = [
                'price' => $item->product->getStripePriceId(),
                'quantity' => $item->quantity
            ];
        }
        return $this->getStripe()->checkout->sessions->create([
            'currency' => 'EUR',
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => 'http://127.0.0.1:8000/stripe/success?session_id={CHECKOUT_SESSION_ID}'
        ]);
    }

    public function getCheckoutSession(string $sessionId): Session
    {
        return $this->getStripe()->checkout->sessions->retrieve($sessionId);
    }
}