<?php

namespace App\Controller\Api;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{

    public function __construct(private ProductRepository $productRepository)
    {}

    #[Route('/api/products', name: 'api.product.getproducts', methods: ['GET'])]
    public function getProducts(): Response
    {
        $products = $this->productRepository->findAllProductsActive();
        return $this->json($products, 200, [], ['groups' => 'product:read']);
    }
}
