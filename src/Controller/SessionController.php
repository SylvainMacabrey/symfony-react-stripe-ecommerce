<?php


namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use App\Services\SessionService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SessionController extends AbstractController
{

    public function __construct(private SessionService $sessionService, private ProductRepository $productRepository)
    {}

    #[Route('/session/shopping-cart', name: 'session.shopping-cart', methods: ['GET'])]
    public function getShoppingCart(): Response
    {
        return $this->json($this->sessionService->getShoppingCart());
    }

    #[Route('/session/shopping-cart/add', name: 'session.shopping-cart.add', methods: ['POST'])]
    public function addItemToShoppingCart(Request $request): Response
    {
        $id = $request->request->get("id");
        $product = $this->productRepository->find($id);
        if ($product) {
            $this->sessionService->addItemToShoppingCart($product);
        }
        return $this->json($this->sessionService->getShoppingCart());
    }

    #[Route('/session/shopping-cart/delete/{id}', name: 'session.shopping-cart.delete', methods: ['DELETE'])]
    public function deleteItemFromShoppingCart(?Product $product): Response
    {
        if ($product) {
            $this->sessionService->deleteItemFromShoppingCart($product);
        }
        return $this->json($this->sessionService->getShoppingCart());
    }

}