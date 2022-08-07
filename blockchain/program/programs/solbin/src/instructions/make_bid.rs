use anchor_lang::prelude::*;
use crate::instructions::SolbinAccountInfo;

pub fn make_bid(
    ctx: Context<MakeBid>,
    bid_amount: u64,
    initial_amount: u64,
    item_to_bid: String,
    _solbin_account_bump: u8,
) -> Result<()> {
    msg!("Making a bid");
    msg!("solbin account address: {}",ctx.accounts.solbin_account.key());

    let existing_solbin_account = &mut ctx.accounts.solbin_account;
    existing_solbin_account.bid_count += 1;

    let new_bid = &mut ctx.accounts.make_bid;
    new_bid.wallet_pubkey = ctx.accounts.authority.key();
    new_bid.solbin_account_pubkey = existing_solbin_account.key();
    new_bid.bid_number = existing_solbin_account.bid_count;
    new_bid.bid_amount = bid_amount;
    new_bid.item_to_bid = item_to_bid;
    Ok(())
}

#[derive(Accounts)]
#[instruction(
    bid_amount: u64,
    item_to_bid: String,
    solbin_account_bump: u8
)]
pub struct MakeBid<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + std::mem::size_of::<Bid>() + 58, 
        seeds = [
            authority.key().as_ref(),
            b"_bid_",
            (solbin_account.bid_count + 1).to_string().as_ref()
        ],
        bump
    )]
    pub make_bid: Account<'info, Bid>,
    #[account(
        mut,
        has_one = authority,
        seeds = [
            authority.key().as_ref(),
            b"_solbin_"
        ],
        bump = solbin_account_bump
    )]
    pub solbin_account: Account<'info, SolbinAccountInfo>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
} 

#[account]
pub struct Bid {
    pub wallet_pubkey: Pubkey,
    pub solbin_account_pubkey: Pubkey,
    pub bid_number: u32,
    pub bid_amount: u64,
    pub item_to_bid: String
}