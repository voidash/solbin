use anchor_lang::prelude::*;

use crate::instructions::SolbinAccountInfo;
use crate::instructions::SolbinErrors;

pub fn modify_user_account(
    ctx: Context<ModifyUserAccount>,
    handle: String,
    _solbin_account_bump: u8,
) -> Result<()> {

    msg!("Modifying Solbin Account");
    require!(handle.len() <= 40, SolbinErrors::UsernameTooLarge);
    
    let existing_solbin_account = &mut ctx.accounts.solbin_account;
    existing_solbin_account.handle = handle;
    msg!("Solbin Account modified Successfully");
    Ok(())
}

#[derive(Accounts)]
#[instruction(
    handle: String,
    solbin_account_bump: u8
)]
pub struct ModifyUserAccount<'info> {
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