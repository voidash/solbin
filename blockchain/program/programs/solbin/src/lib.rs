use anchor_lang::prelude::*;

pub mod instructions;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solbin {
    use super::*;

    pub fn create_user_account(
        ctx: Context<CreateUserAccount>
    )
}

#[derive(Accounts)]
pub struct Initialize {}
