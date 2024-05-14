<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\Pagination\PaginationInterface;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @extends ServiceEntityRepository<Product>
 *
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, private PaginatorInterface $paginator)
    {
        parent::__construct($registry, Product::class);
    }

    public function findAllProductsActive(int $page, int $limit, string $name, string $price): PaginationInterface
    {
        $query = $this->createQueryBuilder('p')
            ->where('p.active = 1');

        if (isset($name) && $name !== "") {
            $query->andWhere('p.name LIKE :name')
                    ->setParameter('name', $name . "%");
        }

        if (isset($price) && $price !== "") {
            $query->andWhere('p.price <= :price')
                    ->setParameter('price', intval($price) * 100);
        }

        return $this->paginator->paginate($query->getQuery(), $page, $limit);
    }
}
