export namespace Transaction {
    export namespace TransactionType {
        export enum Type {
            ADD = 'ADD',
            SUB = 'SUB',
        }
    }
    export namespace TransactionArticle {
        export enum Article {
            INVOICE_PAYMENT = 'INVOICE_PAYMENT',
            CARD_TRANSACTION = 'CARD_TRANSACTION',
            EXCHANGE_TO_CRYPTO = 'EXCHANGE_TO_CRYPTO',
            EXCHANGE_FROM_CRYPTO = 'EXCHANGE_FROM_CRYPTO',
        }
    }

    export namespace TransactionData {
        export type Type = {
            type: TransactionType.Type
            article: TransactionArticle.Article
            amount: number
            currency: number
            card?: number
            wallet?: number
            smsTrigger?: number
            message?: number
            invoice?: number
            user?: number
            partner?: number
        }
    }
}
