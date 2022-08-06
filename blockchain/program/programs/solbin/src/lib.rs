use anchor_lang::prelude::*;

pub mod instructions;
use instructions::*;

declare_id!("HTzsNmejt7QRqcotnrKEZJaRqyBMnqsKykeFeQWhxdS2");

#[program]
pub mod solbin {
    use super::*;

    pub fn make_bid(
        ctx: Context<MakeBid>,
        bid_amount: u64,
        item_to_bid: String,
        solbin_account_bump: u8,
    ) -> Result<()> {
            make_bid::make_bid(ctx, bid_amount, item_to_bid, solbin_account_bump)
    }

    pub fn create_user_account(
        ctx: Context<CreateUserAccount>,
        handle:String,
    ) -> Result<()> {
        create_user_account::create_user_account(ctx, handle)
    }

    pub fn modify_user_account(
        ctx: Context<ModifyUserAccount>,
        handle:String,
        solbin_account_bump: u8
    ) -> Result<()> {
        modify_user_account::modify_user_account(ctx, handle, solbin_account_bump)
    }


}
