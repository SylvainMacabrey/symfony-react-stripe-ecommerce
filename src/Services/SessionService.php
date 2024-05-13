<?php

namespace App\Services;

use App\Entity\Product;
use App\Model\ShoppingCart;
use App\Model\ShoppingCartItem;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class SessionService
{
    public const SHOPPING_CART = "shopping_cart";

    public function __construct(private RequestStack $requestStack)
    {
        
    }

    public function getShoppingCart(): ShoppingCart
    {
        return $this->getSession()->get(self::SHOPPING_CART, new ShoppingCart());
    }

    public function addItemToShoppingCart(Product $product): void
    {
        $shoppingCart = $this->getShoppingCart();
        $existShoppingCartItem = $this->getExistingShoppingCartItem($product);
        if ($existShoppingCartItem) {
            $existShoppingCartItem->quantity++;
        } else {
            $shoppingCart->items->add(new ShoppingCartItem($product, 1));
        }
        $this->getSession()->set(self::SHOPPING_CART, $shoppingCart);
    }

    public function deleteItemFromShoppingCart(Product $product): void
    {
        $shoppingCart = $this->getShoppingCart();
        $existShoppingCartItem = $this->getExistingShoppingCartItem($product);
        if (!$existShoppingCartItem) {
            return;
        }
        $shoppingCart->items->removeElement($existShoppingCartItem);
        $reindexedItems = array_values($shoppingCart->items->toArray());
        $shoppingCart->items = new ArrayCollection($reindexedItems);
        $this->getSession()->set(self::SHOPPING_CART, $shoppingCart);
    }

    private function getExistingShoppingCartItem(Product $product): ShoppingCartItem|null
    {
        $existShoppingCartItem = $this
            ->getShoppingCart()
            ->items
            ->filter(fn (ShoppingCartItem $item) => $item->product->getId() === $product->getId())
            ->first();
        if ($existShoppingCartItem === false) {
            return null;
        }
        return $existShoppingCartItem;
    }

    private function getSession(): SessionInterface
    {
        return $this->requestStack->getSession();
    }
}