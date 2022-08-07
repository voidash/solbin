use anchor_lang::prelude::*;
use crate::instructions::SolbinErrors;

pub fn create_user_account(
    ctx: Context<CreateUserAccount>,
    handle: String,
    display_name: String,
) -> Result<()> {
    msg!("create new solbin account for bidding");
    require!(handle.len() <= 40, SolbinErrors::UsernameTooLarge);

    let new_solbin_account = &mut ctx.accounts.solbin_account;
    new_solbin_account.handle = handle;
    new_solbin_account.bid_count = 0;
    new_solbin_account.authority = ctx.accounts.authority.key();
    Ok(())
}

#[derive(Accounts)]
pub struct CreateUserAccount<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + std::mem::size_of::<SolbinAccountInfo>() + 10,
        seeds = [
            authority.key().as_ref(),
            b"_solbin_"
        ],
        bump
    )]
    pub solbin_account: Account<'info,SolbinAccountInfo>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}


#[account]
pub struct SolbinAccountInfo {
    pub handle: String,
    pub bid_count : u32,
    pub authority: Pubkey
}

