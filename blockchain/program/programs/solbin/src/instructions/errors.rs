use anchor_lang::prelude::*;

#[error_code]
pub enum SolbinErrors {
    #[msg("Username handle is too large ")]
    UsernameTooLarge
}
