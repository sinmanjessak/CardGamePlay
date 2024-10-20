using CardGameAPI.DTO;
using CardGameAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CardGameAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController(CardService cardService) : ControllerBase
    {
        private readonly CardService _cardService = cardService;

        [HttpPost("sort")]
        public ActionResult<CardResponseDto> SortCards([FromBody] CardRequestDto request)
        {
            try
            {
                var sortedCards = _cardService.SortCards(request.Cards);
                return Ok(new CardResponseDto { SortedCards = sortedCards });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }



}