using InterviewTask.Server.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InterviewTask.Server.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        private const string SessionKey = "NumbersList";
        private readonly ISessionService _sessionService;

        public CalculatorController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [HttpGet]
        [Route("GetNumbers")]
        public IActionResult GetNumbers()
        {
            var numbers = _sessionService.GetNumbersFromSession();
            return Ok(new { numbers });
        }

        [HttpGet]
        [Route("GenerateNumber")]
        public IActionResult GenerateNumber()
        {
            _sessionService.GenerateRandomNumber();

            var numbers = _sessionService.GetNumbersFromSession();

            return Ok(new { numbers }); ;
        }

        [HttpGet]
        [Route("Clear")]
        public IActionResult Clear()
        {
            _sessionService.ClearSession();

            return Ok(new { numbers = new List<int>(), sum = 0 });
        }

        [HttpGet]
        [Route("Sum")]
        public IActionResult Sum()
        {
            var sum = _sessionService.SumNumbers();

            return Ok(new { sum });
        }

    }
}
