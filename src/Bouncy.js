(function(w) {

	//	-----------------------
	//	Bouncy : ParticleSystem
	//	-----------------------
	var Bouncy = function() {
	};

	var p = Bouncy.prototype = new ParticleSystem;

	p.run = function(canvasId, fps) {

		var canvas = this.canvas = document.getElementById(canvasId)
			ctx = this.ctx = this.canvas.getContext('2d')
			fps = this.fps = fps || 30,
			self = this;
		
		self.loop = setInterval(function() {
		
			ctx.fillStyle = self.bgColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for(var i = 0; i < self.particleNum; i++) {
			
				var p = self.particles[i];
			
				ctx.beginPath();
				ctx.fillStyle = p.color;
				ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2, true);
				ctx.fill();
				ctx.closePath();
				
				p.vel.x += self.totForce.x;
				p.vel.y += self.totForce.y;
				p.pos.x += p.vel.x;
				p.pos.y += p.vel.y;
				
				if(p.pos.x >= canvas.width || p.pos.x <= 0) {
					p.vel.x *= -1;
					
				}
				if(p.pos.y >= canvas.height || p.pos.y <= 0) {
					p.vel.y *= -1;
				}
				
			}
		
		}, 1000 / fps);
		
	};
	
	w.Bouncy = Bouncy;

})(window);