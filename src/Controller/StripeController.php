<?php

namespace App\Controller;

use App\Services\SessionService;
use App\Services\StripeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{
    public function __construct(private StripeService $stripeService)
    {}

    #[Route('/stripe/checkout-session', name: 'stripe.create-checkout-session', methods: ['POST'])]
    public function createCheckoutSession(SessionService $sessionService): Response
    {
        return $this->json([
            "url" => $this->stripeService->createCheckoutSession($sessionService->getShoppingCart())->url,
        ]);
    }

    #[Route('/stripe/success', name: 'stripe.success', methods: ['GET'])]
    public function success(Request $request): Response
    {
        $sessionId = $request->query->getString("session_id");
        return $this->render("stripe/success.html.twig", [
            'amountTotal' => $this->stripeService->getCheckoutSession($sessionId)->amount_total,
        ]);
    }
}