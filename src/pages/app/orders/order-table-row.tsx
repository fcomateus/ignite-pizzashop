import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, X , Search} from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";

export interface OrderTableRow {
    order: {
        orderId: string
        createdAt: string
        status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
        customerName: string
        total: number
    }
}

export function OrderTableRow({ order }: OrderTableRow) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const queryClient = useQueryClient()

    const { mutateAsync: cancelOrderRequest } = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_, variables) {
            const { orderId } = variables
            const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
                queryKey: ['orders']
            })

            ordersListCached.forEach(([cacheKey, cacheData]) => {
                if(!cacheData) {
                    return
                }

                queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                    ...cacheData,
                    orders: cacheData.orders.map(order => {
                        if(order.orderId === orderId) {
                            return { ...order, status: 'canceled'}
                        }

                        return order
                    })
                })

            })
        }   
    })

    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant='outline' size='xs'>
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    
                    <OrderDetails open={isDetailsOpen} orderId={order.orderId}/>
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                { order.orderId }
            </TableCell>
            <TableCell className="text-muted-foreground">
                { formatDistanceToNow(order.createdAt, {
                    locale: ptBR,
                    addSuffix: true
                }) }
            </TableCell>
            <TableCell>
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">{order.customerName}</TableCell>
            <TableCell className="font-medium">
                {(order.total / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
            </TableCell>
            <TableCell>
                <Button variant='outline' size='xs'>
                    <ArrowRight className="h-3 w-3 mr-2"/>
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button 
                    disabled={!['pending', 'processing'].includes(order.status)} 
                    onClick={() => cancelOrderRequest({ orderId: order.orderId })}
                    variant='ghost' 
                    size='xs'
                >
                    <X className="h-3 w-3 mr-2"/>
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}