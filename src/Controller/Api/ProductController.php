<?php

namespace App\Controller\Api;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{

    public function __construct(private ProductRepository $productRepository)
    {}

    #[Route('/api/products', name: 'api.product.getproducts', methods: ['GET'])]
    public function getProducts(Request $request): Response
    {
        $pageLimit = 3;
        $page = ($request->query->get('page') !== null && $request->query->get('page') !== "") ? intval($request->query->get('page')) : 1;
        $name = $request->query->get('name');
        $price = $request->query->get('price');
        $products = $this->productRepository->findAllProductsActive($page, $pageLimit, $name, $price);
        return $this->json([
            'products' => $products,
            'totalCount' => $products->getTotalItemCount(),
            'totalPage' => ceil($products->getTotalItemCount() / $pageLimit),
            'pageLimit' => $pageLimit,
            'pageActive' => $page,
        ], 200, [], ['groups' => 'product:read']);
    }
}
